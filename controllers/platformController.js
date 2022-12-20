const Game = require('../models/game');
const Platform = require('../models/platform');

const { body, validationResult } = require('express-validator');
const async = require('async');

// Render platforms page
const platforms_page = async (req, res, next) => {
    try {
        const platform_list = await Platform.find();
        res.render('platforms', {
            platforms: platform_list,
        });
    } catch(err) {
        console.error(err);
        res.redirect('error', err);
    }
};

// CREATE
const platform_create_get = async (req, res) => {
  try {
    res.render('platformform', {
        type: 'Create',
        action: '/platform/create',
        name: 'Platform Example',
    });
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }   
};
const platform_create_post = [
  // Validate & sanitize
  body('name').isLength({ min: 1, max: 20 }).withMessage('Platform title must be between 1 to 20 characters'),

  // Run async callback
  async (req, res) => {
    const errors = validationResult(req); // Capture any validation errors parsed above
    if (!errors.isEmpty()) {
      console.error(errors.array());
      res.send('Validation Error: '+errors.array()[0].msg);
    } else {
      try {
        await Platform.create({
          name: req.body.name,
        });
        res.redirect('/');
      } catch(err) {
        console.error(err);
        res.redirect('error', err);
      }
    }
  }
];

// READ
const platform_read = async (req, res) => {
  try {
    const foundPlatform = await Platform.findById(req.params.id);
    res.render('platformform', {
        type: 'Update',
        action: '/platform/'+foundPlatform.id,
        name: foundPlatform.name,
    });
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
};

// UPDATE
const platform_update = [
  // Validate & sanitize
  body('name').isLength({ min: 1, max: 20 }).withMessage('Platform title must be between 1 to 20 characters'),

  // Run async callback
  async (req, res) => {
    const errors = validationResult(req); // Capture any validation errors parsed above
    if (!errors.isEmpty()) {
      console.error(errors.array());
      res.send('Validation Error: '+errors.array()[0].msg);
    } else {
      try {
        await Platform.findByIdAndUpdate(
          { _id: req.params.id },
          { name: req.body.name }
        );
        res.redirect('/');
      } catch(err) {
        console.error(err);
        res.redirect('error', err);
      }
    }
  }
];

// DESTROY
const platform_destroy_get = async (req, res) => {
    try {
        res.render('deleteplatform');
    } catch(err) {
        console.error(err);
        res.redirect('error', err);
    }
};
const platform_destroy_post = async (req, res) => {
  try {
    await Platform.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
};

module.exports = {
  platforms_page,
  platform_create_get,
  platform_create_post,
  platform_read,
  platform_update,
  platform_destroy_get,
  platform_destroy_post,
};