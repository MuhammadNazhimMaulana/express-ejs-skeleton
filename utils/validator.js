const { body, validationResult, check } = require('express-validator');

// User Model
const User = require('../models/user.model');

// Validation For User
const userValidationRules = () => {
  return [
    check('email', 'Email Tidak Valid').isEmail(),
    check('phone', 'No HP Tidak Valid').isMobilePhone('id-ID'),

    // Custom Validation
    body('username').custom(async (value, { req }) => {

        // Cek Duplikatnya
        const duplicate = await User.findOne({ username: value });

        // Checking old username
        if(req.body.oldUserName)
        {
            // If duplicate exist and username is changed
            if(value != req.body.oldUserName && duplicate){
                throw new Error('Username Sudah ada')
            }

        }else{

            // If there is a duplicate
            if(duplicate){
                throw new Error('Username Sudah ada')
            }            
        }

        return true;

    })
  ]
}

// Sending Error (Whether Error exist or not)
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return next()
}

// Exporting modules
module.exports = {
  userValidationRules,
  validate,
}