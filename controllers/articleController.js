// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

module.exports = {
  scrape: function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.pcgamer.com/news/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      const scraped = [];

      // Now, we grab every h2 within an article tag, and do the following:
      $(".listingResult").each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .children("article")
          .children(".content")
          .children("header")
          .children("h3")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
        result.image = $(this)
          .children("a")
          .children("article")
          .children(".image")
          .children("figure")
          .attr("data-original");
        $("span").remove();
        result.synopsis = $(this)
          .children("a")
          .children("article")
          .children(".content")
          .children(".synopsis")
          .remove("span")
          .text()
          .replace(/\n$/, '')
          .trim();

        // scraped.push(result);
        // if (result.synopsis !== undefined) {
        //   console.log(`${result.synopsis}`);
        // } else {
        //   console.log("empty");
        // }

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
      //   console.log(scraped)
      // Send a message to the client
      res.send("Scrape Complete");
    });
  },
  clearAll: function(req, res){
    
  }
};
