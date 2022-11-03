function validatePassword(str) {
  if (
    str.match(/[a-z]/g) &&
    str.match(/[A-Z]/g) &&
    str.match(/[0-9]/g) &&
    str.match(/[^a-zA-Z\d]/g) &&
    str.length >= 8
  ) {
    return true;
  }
  return false;
}

function validateEmail(email) {
  var rex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(rex)) {
    return true;
  }
  return false;
}

module.exports = { validatePassword, validateEmail };
