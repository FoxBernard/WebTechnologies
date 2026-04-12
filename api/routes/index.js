var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'API working...',
    endpoints: {
      auth: "/auth",
      comments: "/comments",
      events: "/events",
      invitations: "/invitations",
      users: "/users"
    }
    });
});

module.exports = router;
