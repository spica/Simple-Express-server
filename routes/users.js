var express = require('express');
var router = express.Router();
var users = require("../modules/users");

/* GET users listing. */
router.get('/:id', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
