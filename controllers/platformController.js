const Game = require('../models/game');
const Platform = require('../models/platform');

const { body, validationResult } = require('express-validator');
const async = require('async');


// TODO: Display form to create platform
exports.platform_create_get = function (req, res, next) {
    res.render('platform_form');
};
// TODO: Handle form data from above
exports.platform_create_post = [
    body('Platform Name', 'Invalid Name') // TODO: crosscheck name field with forms name field
        .trim()
        .isLength({ min: 1 })
        .escape(),
]

// TODO: Display form to update platform
exports.platform_update_get = function (req, res, next) {
    // TODO: Search for platform if exists, display error if not, otherwise...
    // TODO: Need to render the same platform_form, but this time with the title "Update form".
}
// TODO: platform_update_post
exports.platform_update_post = [
    body('Platform Name', 'Invalid Name') // TODO: crosscheck name field with forms name field
        .trim()
        .isLength({ min: 1 })
        .escape(),
]

// TODO: Display form to delete platform
exports.platform_delete_get = function (req, res, next) {
}
// TODO: platform_delete_post
exports.platform_delete_post = [

]

// TODO: Display list of all platforms
exports.platform_list = function (req, res, next) {
    Game.find()
}

// TODO: Display detail for one platform
exports.platform_detail = function (req, res, next) {
    
}
