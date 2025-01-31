const { body } = require('express-validator');

const bankDetailsValidationRules = [
  body('ifscCode')
    .notEmpty()
    .withMessage('IFSC code is required')
    .isLength({ min: 11 })
    .withMessage('IFSC code should be a minimum of 11 characters'),

  body('branchName')
    .notEmpty()
    .withMessage('Branch name is required')
    .isLength({ min: 6 })
    .withMessage('Branch name should be a minimum of 6 characters'),

  body('bankName')
    .notEmpty()
    .withMessage('Bank name is required')
    .isLength({ min: 3 })
    .withMessage('Bank name should be a minimum of 3 characters'),

  body('accountNumber')
    .notEmpty()
    .withMessage('Account number is required')
    .isLength({ min: 10 })
    .withMessage('Account number should be a minimum of 10 characters')
    .isNumeric()
    .withMessage('Account number must contain only digits'),

  body('accountHolderName')
    .notEmpty()
    .withMessage('Account holder name is required')
    .isLength({ min: 3 })
    .withMessage('Account holder name should be a minimum of 3 characters'),
];

module.exports = { bankDetailsValidationRules };
