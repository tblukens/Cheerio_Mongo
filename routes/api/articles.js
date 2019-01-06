const router = require('express').Router();
const articleController = require('../../controllers/articleController');

// Matches with "/api/article"
router.route('/').get(articleController.showNonCleared);
router.route('/scrape').get(articleController.scrape);
router.route('/save/:id').put(articleController.saveArticle);
router.route('/unsave/:id').put(articleController.removeSavedArticle);
router.route('/saved').get(articleController.showSaved);
router.route('/clear').put(articleController.clearNonSaved);
router.route('/:id').get(articleController.articleWithNotes);

module.exports = router;
