const { body } = require('express-validator/check');

module.exports = {
    register: 
        [
        body('username')
            .isLength({ min: 1 }).trim().withMessage('Username empty.')
            .isAlpha().withMessage('Username must be alphabet letters.'),
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name empty.')
            .isAlpha().withMessage('Name must be alphabet letters.'),
        body('first_name')
            .isLength({ min: 1 }).trim().withMessage('First name empty.')
            .isAlpha().withMessage('First Name must be alphabet letters.'),
        body('email')
            .isEmail().withMessage('Email is wrong'),
        body('password')
            .isLength({ min:8 }).withMessage('Password must be at least 8 characters in length.')
            .matches('[0-9]').withMessage('Password must contain at least 1 number.')
            .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
            .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.'),
        ]
}