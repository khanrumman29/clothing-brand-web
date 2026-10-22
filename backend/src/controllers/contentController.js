import { SiteContent } from '../models/SiteContent.js';
import { defaultSiteContent } from '../data/initialData.js';
import { isDbConnected } from '../config/db.js';

// In-memory cache/fallback so changes work even before MongoDB is connected!
let inMemoryContent = JSON.parse(JSON.stringify(defaultSiteContent));

/**
 * @desc    Get all site content or specific section
 * @route   GET /api/content
 * @access  Public
 */
export const getSiteContent = async (req, res) => {
  try {
    if (isDbConnected()) {
      const records = await SiteContent.find({});
      if (records && records.length > 0) {
        const contentMap = { ...defaultSiteContent };
        records.forEach((rec) => {
          contentMap[rec.sectionKey] = rec.data;
        });
        return res.json({
          success: true,
          source: 'database',
          data: contentMap
        });
      }
    }

    // Return in-memory fallback
    res.json({
      success: true,
      source: isDbConnected() ? 'default' : 'memory',
      data: inMemoryContent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get specific section content
 * @route   GET /api/content/:sectionKey
 * @access  Public
 */
export const getSectionContent = async (req, res) => {
  const { sectionKey } = req.params;

  try {
    if (isDbConnected()) {
      const record = await SiteContent.findOne({ sectionKey });
      if (record) {
        return res.json({
          success: true,
          source: 'database',
          data: record.data
        });
      }
    }

    const section = inMemoryContent[sectionKey] || defaultSiteContent[sectionKey];
    if (!section) {
      return res.status(404).json({ success: false, message: `Section "${sectionKey}" not found` });
    }

    res.json({
      success: true,
      source: isDbConnected() ? 'default' : 'memory',
      data: section
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update any section content (Admin)
 * @route   PUT /api/content/:sectionKey
 * @access  Public / Admin
 */
export const updateSectionContent = async (req, res) => {
  const { sectionKey } = req.params;
  const newContent = req.body;

  try {
    // Update in memory
    inMemoryContent[sectionKey] = {
      ...(inMemoryContent[sectionKey] || {}),
      ...newContent
    };

    // Update in database if connected
    if (isDbConnected()) {
      const updated = await SiteContent.findOneAndUpdate(
        { sectionKey },
        { data: inMemoryContent[sectionKey], lastUpdatedBy: 'Admin' },
        { upsert: true, new: true }
      );
      return res.json({
        success: true,
        message: `Section "${sectionKey}" updated successfully in Database`,
        data: updated.data
      });
    }

    res.json({
      success: true,
      message: `Section "${sectionKey}" updated successfully in Memory (Connect MongoDB to persist permanently)`,
      data: inMemoryContent[sectionKey]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Quick helper to update Hero image & text
 * @route   PUT /api/content/hero
 * @access  Public / Admin
 */
export const updateHero = async (req, res) => {
  const { image, heading, subheading, buttons } = req.body;

  try {
    const currentHero = inMemoryContent.hero || defaultSiteContent.hero;
    const updatedHero = {
      ...currentHero,
      ...(image !== undefined && { image }),
      ...(heading !== undefined && { heading }),
      ...(subheading !== undefined && { subheading }),
      ...(buttons !== undefined && { buttons })
    };

    inMemoryContent.hero = updatedHero;

    if (isDbConnected()) {
      await SiteContent.findOneAndUpdate(
        { sectionKey: 'hero' },
        { data: updatedHero, lastUpdatedBy: 'Admin' },
        { upsert: true, new: true }
      );
    }

    res.json({
      success: true,
      message: 'Hero section updated successfully!',
      data: updatedHero
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Reset all site content back to defaults
 * @route   POST /api/content/reset
 * @access  Admin
 */
export const resetSiteContent = async (req, res) => {
  try {
    inMemoryContent = JSON.parse(JSON.stringify(defaultSiteContent));

    if (isDbConnected()) {
      await SiteContent.deleteMany({});
      const inserts = Object.entries(defaultSiteContent).map(([sectionKey, data]) => ({
        sectionKey,
        data,
        lastUpdatedBy: 'System Seed'
      }));
      await SiteContent.insertMany(inserts);
    }

    res.json({
      success: true,
      message: 'Site content has been reset to default mockup values!',
      data: inMemoryContent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
