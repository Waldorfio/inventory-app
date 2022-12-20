const Game = require('../models/game');
const Platform = require('../models/platform');

const { body, validationResult } = require('express-validator');
const async = require('async');

// Render games page
const games_page = async (req, res, next) => {
  try {
    const game_list = await Game.find();
    res.render('games', {
      games: game_list,
    });
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
}

// CREATE
const game_create_get = async (req, res) => {
  try {
    const platform_list = await Platform.find().populate();
    res.render('gameform', { // Set placeholder values in create form
      type: 'Create',
      action:'/game/create',
      title: 'Sample Game',
      summary: 'This is an example of a summary.',
      edition: 'Standard Edition',
      review: '66',
      price: '69.99',
      discount: '4.99',
      release: '2015-03-25',
      platform_list: platform_list,
    });
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }   
}
const game_create_post = [
  // Validate & sanitize
  body('title').isLength({ min: 1 }).withMessage('Game name must be at least 1 character'),
  body('summary').optional({checkFalsy:true}),
  body('edition', 'Edition must not be empty.'),
  body('review').isInt({ min: 0, max: 100 }).withMessage('Review must be integer from 0 to 100'),
  body('discount').optional({checkFalsy:true}).isFloat({min: 0}).withMessage('Discount must be greater than $0'),
  body('release', 'Release date must not be empty').isDate().withMessage('Not a valid date'),
  body('platform', 'Platform must not be empty'),
  
  // Run async callback
  async (req, res, next) => {
    const errors = validationResult(req); // Capture any validation errors parsed above
    if (!errors.isEmpty()) {
      console.error(errors.array());
      res.send('Validation Error: '+errors.array()[0].msg);
    } else {
      try {
        const newGame = await Game.create({
          title: req.body.title,
          summary: req.body.summary,
          edition: req.body.edition,
          review: req.body.review,
          price: req.body.price,
          discount: req.body.discount,
          release: req.body.release,
          platform: req.body.platform,
        })
        console.log('Game created! ('+newGame+')');
        res.redirect('/');
      } catch(err) {
        console.error(err);
        res.redirect('error', err);
      }
    }
  }
]

// READ
const game_read = async (req, res) => {
  try {
    const foundgame = await Game.findById(req.params.id).populate('platform');
    const platform_list = await Platform.find().populate();
    res.render('gameform', {
      type: 'Update',
      action:'/game/'+foundgame.id,
      platform_list: platform_list,
      title: foundgame.title,
      summary: foundgame.summary,
      edition: foundgame.edition,
      review: foundgame.review,
      price: foundgame.price,
      discount: foundgame.discount,
      release: foundgame.release,
    })
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
}

// UPDATE
const game_update = [
  // Validate & sanitize
  body('title').isLength({ min: 1 }).withMessage('Game name must be at least 1 character'),
  body('summary').optional({checkFalsy:true}),
  body('edition', 'Edition must not be empty.'),
  body('review').isInt({ min: 0, max: 100 }).withMessage('Review must be integer from 0 to 100'),
  body('discount').optional({checkFalsy:true}).isFloat({min: 0}).withMessage('Discount must be greater than $0'),
  body('release', 'Release date must not be empty').isDate().withMessage('Not a valid date'),
  body('platform', 'Platform must not be empty'),

  // Run async callback
  async (req, res) => {
    const errors = validationResult(req); // Capture any validation errors parsed above
    if (!errors.isEmpty()) {
      console.error(errors.array());
      res.send('Validation Error: '+errors.array()[0].msg);
    } else {
      try {
        const newGame = await Game.findByIdAndUpdate(
          { _id: req.params.id },
          {
          title: req.body.title,
          summary: req.body.summary,
          edition: req.body.edition,
          review: req.body.review,
          price: req.body.price,
          discount: req.body.discount,
          release: req.body.release,
          platform: req.body.platform}
        )
        console.log('Game updated! ('+newGame+')');
        res.redirect('/games');
      } catch(err) {
        console.error(err);
        res.redirect('error', err);
      }
    }
  }
]

// DESTROY
const game_destroy_get = async (req, res) => {
  try {
    res.render('delete');
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
}
const game_destroy_post = async (req, res) => {
    try {
        const foundGame = await Game.findByIdAndDelete(req.params.id);
        console.log('Game deleted! ('+foundGame+')');
        res.redirect('/games');
    } catch(err) {
        console.error(err);
        res.redirect('error', err);
    }
}

module.exports = {
    games_page,
    game_create_get,
    game_create_post,
    game_read,
    game_update,
    game_destroy_get,
    game_destroy_post,
}