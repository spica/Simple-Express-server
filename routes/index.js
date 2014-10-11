var express = require('express');
var router = express.Router();
var users = require("../modules/users");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome' , msg: "Please enter your credentials below"});
});

router.post('/clearData', function(req, res) {
  users.allClear(function(err) {
    if (err == null) {
      res.writeHead(200, {'Content-Type': "application/json"});
      res.write(JSON.stringify({"error_code" : 0}));
    } else {
      res.write(JSON.stringify({"error_code" : -5}));
    }
    res.send();
  });
});

router.post('/login', function(req, res) {
  var post = req.body;
  console.log(post);
  console.log(post.username);
  users.login(post.username, post.password, function(err, usr) {
    console.log("callback login! ");
    console.log(err);
    console.log(usr);
    // create session
    res.writeHead(200, {'Content-Type': "application/json"});
    if (err == null && usr != null) {
      res.write(JSON.stringify({"user_name" : usr.username, "login_count" : usr.loginCnt}));
    } else {
      // return -4 
      res.write(JSON.stringify({"error_code" : -4}));
    }
    res.send();
  });
});

router.post('/signup', function(req, res) {
  var post = req.body;
  console.log(post);
  users.create(post, function(err, usr) {
    // create session
    console.log(err);
    console.log(usr);
    res.writeHead(200, {'Content-Type': "application/json"});
    if (err == null && usr != null) {
      // set user login count + 1
      res.write(JSON.stringify({"user_name" : usr.username, "login_count" : usr.loginCnt}));
    } else if (err != null) {
      //res.write(JSON.stringify({"success": false}));
      console.log(err);
      if (err.code && err.code == 11000) {
        res.write(JSON.stringify({"error_code" : -3}));
      } else if (err.errors.username && err.errors.username.message == "Invalid username length")
        res.write(JSON.stringify({"error_code" : -1}));
      else if (err.errors.password && err.errors.password.message == "Invalid password length")
        res.write(JSON.stringify({"error_code" : -2}));
    }
    res.send();
  });
});

router.post('/signout', function(req, res) {
  // remove session
  //
});

module.exports = router;
