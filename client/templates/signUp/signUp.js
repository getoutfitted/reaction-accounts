


Template.loginFormSignUpView.events({
  // *******************************************************
  // Submit the sign in form
  //
  'click .action--submit': function (event, template) {
    var options = {};

    // var usernameInput = template.$('.login-input--username');
    var emailInput = template.$('.login-input--email');
    var passwordInput = template.$('.login-input--password');

    var email = emailInput.val().trim()
    var password = passwordInput.val().trim()

    var validatedEmail = LoginFormValidation.email(email);
    var validatedPassword = LoginFormValidation.password(password);

    var errors = {};

    if (validatedEmail !== true ) {
      errors.email = validatedEmail.reason;
    }

    if (validatedPassword !== true) {
      errors.password = validatedPassword;
    }

    if ($.isEmptyObject(errors) === false) {
      Template.instance().formErrors.set(errors);
      // prevent signup
      return;
    }

    var newUserData = {
      // username: username,
      email: email,
      password: password
    }

    Accounts.createUser(newUserData, function(error, result) {
      if( error ) {
        // Show some error message
        console.log(error)
      } else {
        // Close dropdown or navigate to page
      }

    });
  }

});


Template.loginFormSignUpView.onCreated(function() {
  this.uniqueId = Random.id();
  this.formErrors = new ReactiveVar({})
})


Template.loginFormSignUpView.helpers(LoginFormSharedHelpers);


Template.loginFormSignUpView.helpers({
  json: function (obj) {
    return JSON.stringify(obj)
  }
});