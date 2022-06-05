var password = document.getElementById("password")

// TODO:
/* Add functionality to passwordComplexity() to check for number */

function passwordComplexity() {
  if (password.value.length < 7) {
    password.setCustomValidity("Password not complex enough. Must contain at least 7 characters and 1 number.");
  } else {
    password.setCustomValidity('');
  }
}

password.onchange = passwordComplexity;
password.onkeyup = passwordComplexity;


var confirm_password = document.getElementById("confirm_password");

function validatePasswords() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords do not match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePasswords;
confirm_password.onkeyup = validatePasswords;


var email = document.getElementById("email")

function validateEmail() {
    if (email.value.includes('@') === false) {
        email.setCustomValidity("Email must contain '@'")
    } else {
        email.setCustomValidity('')
    }
}

email.onchange = validateEmail;
email.onkeyup = validateEmail;