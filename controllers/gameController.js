const Game = require('../models/game');
const Platform = require('../models/platform');

const { body, validationResult } = require('express-validator');
const async = require('async');

// TODO: exports.index
const index = async (req, res, next) => {
    try {
        const game_list = await Game.find();
        res.render('games', {
            games: game_list
        });

    } catch(err) {
        console.error(err);
    }
}

// CREATE
const game_create_get = async (req, res) => {
  try {
    res.render('gameform', {
        type: 'Create',
        action:'/game/create',
        title: 'Sample Game',
        summary: 'This is an example of a summary.',
        edition: 'Standard Edition',
        review: '6.6',
        price: '69.99',
        discount: '4.99',
        release: new Date("2015-03-25"),
//         platform: 'test',
    })};
  } catch(err) {
    console.error(err);
  }   
}
const game_create_post = async (req, res) => {
  try {
    console.log('Creating game...')
    const newGame = await Game.create({
      title: req.body.title,
      summary: req.body.summary,
      edition: req.body.edition,
      review: req.body.review,
      price: req.body.price,
      discount: req.body.discount,
      release: req.body.release,
    //   platform: req.body.platform, // TODO ADD PLATFORM DROPDOWN, and RE-ENABLE MODEL
    })
    console.log('Game created! ('+newGame+')');
    res.redirect('/');
  } catch(err) {
    console.error(err);
  }   
}

// READ
const game_read = async (req, res) => {
  try {
    const foundgame = await Game.findById(req.params.id);
    console.log('---------------');
    console.log('found game');
    res.render('gameform', {
        type: 'Update',
        action:'/game/'+foundgame.id,
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
  }
}

// UPDATE
const game_update = async (req, res) => {
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
        release: req.body.release}
//         platform: req.body.platform, // TODO ADD PLATFORM DROPDOWN, and RE-ENABLE MODEL
    )
    console.log('Game updated! ('+newGame+')');
    res.redirect('/games');
  } catch(err) {
    console.error(err);
  }
}

// DESTROY
const game_destroy_get = async (req, res) => {
    try {
        res.render('delete');
    } catch(err) {
        console.error(err);
    }
}
const game_destroy_post = async (req, res) => {
    try {
        const foundGame = await Game.findByIdAndDelete(req.params.id);
        console.log('Game deleted! ('+foundGame+')');
        res.redirect('/games');
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    index,
    game_create_get,
    game_create_post
    game_read,
    game_update,
    game_destroy_get,
    game_destroy_post,
}
