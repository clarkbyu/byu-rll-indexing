var express = require('express');
var router = express.Router();
var expressSession = require('express-session');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'RLL Indexing' });
});

/* GET admin page. */
router.get('/admin', function(req, res) {
  res.sendFile('admin.html', { root: path.join(__dirname, '../public') });
});

module.exports = router;
