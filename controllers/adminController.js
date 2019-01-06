const db = require('../models');

module.exports = {
  adminShowAll: function(req, res) {
    db.Article.updateMany(
      { cleared: true, saved: false },
      { cleared: false },
      { multi: true }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },
  adminDeleteAll: function(req, res) {
    db.Article.deleteMany({})
      .then(res.send('Cleared'))
      .catch(err => console.log(err));
  },
  adminDeleteNotes: function(req, res) {
    db.Note.deleteMany({})
      .then(res.send(`Notes cleared`))
      .catch(err => console.log(err));
  }
};
