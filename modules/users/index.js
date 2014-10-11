User = require("./model");

module.exports = {
  get: function(id, callback) {
    User.findOne(id, function(err, user) {
      callback(err, user);
    });
  },

  create: function(data, callback) {
    console.log('user create');
    data['loginCnt'] = 1;
    var user = new User(data);
    console.log(user);
    user.save(function(err, u) {
      callback(err, u);
    });
  },

  login: function(username, passwd, callback) {
    console.log('user login');
    User.findOne({"username" :  username, "password" : passwd}, function(err, user) {
      if (err == null && user != null) {
        // login 성공하면 loginCnt 1씩 증가시킴.
        user.loginCnt += 1;
        user.save(function(err2, u) {
          callback(err2, u);
        });
      } else {
        callback(err, user);
      }
    });
  },
  
  allClear: function(callback) {
    console.log('all clear');
    User.remove({}, function(err) {
      console.log(err);
      callback(err);
    });
  }
}

