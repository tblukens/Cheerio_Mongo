const router = require('express').Router();
const adminController = require('../../controllers/adminController');

// Matches with "/api/admin"
router.route('/fix-removed').put(adminController.adminShowAll);
router.route('/killarticles').delete(adminController.adminDeleteAll);
router.route('/killnotes').delete(adminController.adminDeleteNotes);

module.exports = router;
