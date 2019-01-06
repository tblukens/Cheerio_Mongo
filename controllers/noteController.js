const db = require('../models');

module.exports = {
  addNote: function(req, res) {
    console.log(req.body);
    db.Note.create(req.body)
      .then(function(dbNote) {
        console.log(dbNote);
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { note: dbNote._id } },
          { new: true }
        );
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },
  showNotesDB: function(req, res) {
    db.Note.find({})
      .then(notes => {
        res.send(notes);
        console.log(notes);
      })
      .catch(err => console.log(err));
  }
};
