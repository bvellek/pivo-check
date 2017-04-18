const express = require('express');
const passport = require('passport');
const validator = require('validator');

const router = new express.Router();

// Registration Form
// payload object is the HTTP body message
// returns the result of validation. object contains boolean validation, error tips and a global message for whole form
function validateRegistrationForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim() === 0 || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a valid email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide a password.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim() !== payload.confirmPassword.trim()) {
    isFormValid = false;
    errors.password = 'Passwords do not match. Please try again.';
  }

  if (!payload || typeof payload.firstName !== 'string' || payload.firstName.trim().length === 0) {
    isFormValid = false;
    errors.firstName = 'Please provide your first name.';
  }

  if (!payload || typeof payload.lastName !== 'string' || payload.lastName.trim().length === 0) {
    isFormValid = false;
    errors.lastName = 'Please provide your last name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

// Login Form
// payload object is the HTTP body message
// returns the result of validation. object contains boolean validation, error tips and a global message for whole form
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

router.post('/registration', (req, res, next) => {
  const validationResult = validateRegistrationForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }
  return passport.authenticate('local-registration', (err) => {
    if (err) {
      // 11000 Mongo code is for duplicate email error
      if (err.name === 'MongoError' && err.code === 11000) {
        // 409 HTTP status for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.',
          },
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully registered! Now you should be able to log in.',
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }
  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectEmailError') {
        return res.status(400).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: err.message,
          },
        });
      } else if (err.name === 'IncorrectPasswordError') {
        return res.status(400).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            password: err.message,
          },
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData,
    });
  })(req, res, next);
});

module.exports = router;

