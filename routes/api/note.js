const router = require('express').Router();
const noteController = require('../../controllers/noteController');

// Matches with "/api/note"
router.route('/add/:id').post(noteController.addNote);
router.route('/').get(noteController.showNotesDB);
router.route('/delete/:id').delete(noteController.deleteNote);

module.exports = router;
