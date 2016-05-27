var express = require('express');
var router = express.Router();
var os = require('os');
var redis = require('redis');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = { title: 'Express on: ' + os.hostname(), username: "anonymous" };
  if (req.session && req.session.username) {
    data = { title: 'Express on: ' + os.hostname(), username: req.session.username };
  }
  res.render('index', data);
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  console.log("username: " + req.body.username);
  req.session.username = req.body.username;
  res.redirect('/');
});

router.get('/test', function(req, res, next) {
  var client = redis.createClient('6379', process.env.REDIS_HOST||'redis');
  client.incr('counter', function(err, counter) {
    if (err) return next(err);
    res.send('this page has been viewed ' + counter + ' times!');
  });
});

module.exports = router;
