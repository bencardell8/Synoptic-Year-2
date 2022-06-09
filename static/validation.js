var password = document.getElementById("password")

function passwordComplexity() {
  if (password.value.length < 7) {
    password.setCustomValidity("Password not complex enough. Must contain at least 7 characters.");
  } else {
    password.setCustomValidity('');
  }
}

var confirm_password = document.getElementById("confirm_password");

function validatePasswords() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords do not match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

var email = document.getElementById("email")

function validateEmail() {
    if (email.value.includes('@') === false) {
        email.setCustomValidity("Email must contain '@'")
    } else {
        email.setCustomValidity('')
    }
}
