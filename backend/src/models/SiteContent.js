import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema(
  {
    sectionKey: {
      type: String,
      required: true,
      unique: true,
      index: true
      // e.g. 'hero', 'announcement', 'winterCollections', 'harfaBanner', 'videoBanner', 'featuredCollections'
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    lastUpdatedBy: {
      type: String,
      default: 'Admin'
    }
  },
  {
    timestamps: true
  }
);

export const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema);
