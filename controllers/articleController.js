// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require('axios');
var cheerio = require('cheerio');

// Require all models
var db = require('../models');

module.exports = {
  scrape: function(req, res) {
    // First, we grab the body of the html with axios
    axios.get('https://www.pcgamer.com/news/').then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      const scraped = [];

      // Now, we grab every h2 within an article tag, and do the following:
      $('.listingResult').each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children('a')
          .children('article')
          .children('.content')
          .children('header')
          .children('h3')
          .text();
        result.link = $(this)
          .children('a')
          .attr('href');
        result.image = $(this)
          .children('a')
          .children('article')
          .children('.image')
          .children('figure')
          .attr('data-original');
        $('span').remove();
        result.synopsis = $(this)
          .children('a')
          .children('article')
          .children('.content')
          .children('.synopsis')
          .remove('span')
          .text()
          .replace(/\n$/, '')
          .trim();

        scraped.push(result);
        // if (result.synopsis !== undefined) {
        //   console.log(`${result.synopsis}`);
        // } else {
        //   console.log("empty");
        // }

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            // console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            if (err.code === 11000) {
              // console.log('Article exists already.');
            } else {
              console.log(err.errmsg);
            }
          });
      });
      //   console.log(scraped)
      // Send a message to the client
      res.send('Scrape Complete');
    });
  },
  showNonCleared: function(req, res) {
    db.Article.find({ cleared: false, saved: false }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    });
  },
  clearNonSaved: function(req, res) {
    db.Article.updateMany(
      { cleared: false, saved: false },
      { cleared: true },
      { multi: true },
      (err, response) => {
        console.log(`Updated ${response} articles.`);
      }
    );
  },
  showSaved: function(req, res) {
    db.Article.find({ saved: true }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    });
  },
  saveArticle: function(req, res) {
    console.log(req.params.id);
    db.Article.findByIdAndUpdate(req.params.id, { saved: true })
      .then(function(data) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(data);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },
  removeSavedArticle: function(req, res) {
    db.Article.findByIdAndUpdate(req.params.id, { saved: false })
      .then(data => res.send(data))
      .catch(err => console.log(err));
  },
  articleWithNotes: function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.find({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate({
        path: 'note',
        model: 'Note'
      })
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  }
};
