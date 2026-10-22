import express from 'express';
import {
  getSiteContent,
  getSectionContent,
  updateSectionContent,
  updateHero,
  resetSiteContent
} from '../controllers/contentController.js';

const router = express.Router();

router.get('/', getSiteContent);
router.post('/reset', resetSiteContent);
router.put('/hero', updateHero);
router.get('/:sectionKey', getSectionContent);
router.put('/:sectionKey', updateSectionContent);

export default router;
