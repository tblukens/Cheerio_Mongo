const router = require("express").Router();
const articleController = require("../../controllers/articleController");

// Matches with "/api/books"
router.route("/scrape")
  .get(articleController.scrape);

  module.exports = router;