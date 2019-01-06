const db = require('../models');

module.exports = {
  adminShowAll: function(req, res) {
    db.Article.update(
      { cleared: true, saved: false },
      { cleared: false },
      { multi: true },
      (err, num) => {
        if (err) {
          console.log(err);
        }
        res.send(`Updated ${num} articles.`);
        console.log(`Updated ${num} articles.`);
      }
    );
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
