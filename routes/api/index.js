const router = require('express').Router();
const articleRoutes = require('./articles');
const noteRoutes = require('./note');
const adminRoutes = require('./admin');

// Book routes
router.use('/article', articleRoutes);
router.use('/note', noteRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
