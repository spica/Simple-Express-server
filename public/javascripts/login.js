$(document).ready(function(){
  console.log('document ready!');
  $('#login').click(function(e) {
    console.log('login clicked');
    var data = $('#login_form').serialize();
    console.log(data);
    $.ajax({
      url: "/login",
      type: "POST",
      dataType: "json",
      data: data,
      success: function(res) {
        console.log(res);
        if (res.error_code && eval(res.error_code) == -4) {
          var msg = "Invalid username and password combination. Please try again.";
          $('.message_area').addClass('error');
          $('.message_area').html(msg);
        } else {
          $('.message_area').removeClass('error');
          $('.message_area').html("");
          $('.login_container').addClass('hide');
          $('.user_name').html(res.user_name);
          $('.login_count').html(res.login_count);
          $('.welcome_container').removeClass('hide');
        }
      },
      error: function(err){
        console.log(err);
      }
    });
  });

  $('#signup').click(function(e) {
    console.log('signup clicked!');
    var data = $('#login_form').serialize();
    console.log(data);
    $.ajax({
      url: "/signup",
      type: "POST",
      dataType: "json",
      data: data,
      success: function(res) {
        console.log(res);
        if (res.error_code) {
          var msg = "";
          $('.message_area').addClass('error');
          switch(eval(res.error_code)) {
            case -1: 
              msg = "The user name should be 5~20 characters long. Please try again.";
              break;
            case -2:
              msg = "The password should be 8~20 characters long. Please try again.";
              break;
            case -3:
              msg = "This user name already exists. Please try again.";
              break;
            default: 
              console.log('default');
          }
          $('.message_area').html(msg);
        } else {
          $('.message_area').html("");
          $('.message_area').removeClass('error');
          $('.login_container').addClass('hide');
          $('.user_name').html(res.user_name);
          $('.login_count').html(res.login_count);
          $('.welcome_container').removeClass('hide');
        }
      },
      error: function(err){
        console.log(err);
      }
    });
  });

  $('#logout').click(function(e) {
    $('.message_area').html("Please enter your credentials below");
    $('.message_area').removeClass('error');
    $('#username').val("");
    $('#password').val("");
    $('.login_container').removeClass('hide');
    $('.welcome_container').addClass('hide');
  });


  $('#clearData').click(function(e){
    $.ajax({
      url: "/clearData",
      type: "POST",
      dataType: "json",
      success: function(res) {
        console.log(res);
      }
    });
  });
});
