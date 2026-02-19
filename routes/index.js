const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'First Express App',
    photos: req.app.locals.photos 
  });
});

module.exports = router;
