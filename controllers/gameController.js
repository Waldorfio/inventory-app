const Game = require('../models/game');
const Platform = require('../models/platform');
const Publisher = require('../models/publisher');

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

const game_create = async (req, res) => {
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
    //   platform: req.body.platform, // TODO ADD PLATFORM AND PUBLISHER DROPDOWN, and RE-ENABLE MODEL
    //   publisher: req.body.publisher, // TODO ADD PLATFORM AND PUBLISHER DROPDOWN, and RE-ENABLE MODEL
    })
    console.log('Game created! ('+newGame+')');
    res.redirect('/');
  } catch(err) {
    console.error(err);
  }   
}

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
//         platform: req.body.platform, // TODO ADD PLATFORM AND PUBLISHER DROPDOWN, and RE-ENABLE MODEL
//         publisher: req.body.publisher, // TODO ADD PLATFORM AND PUBLISHER DROPDOWN, and RE-ENABLE MODEL
    )
    console.log('Game updated! ('+newGame+')');
    res.redirect('/games');
  } catch(err) {
    console.error(err);
  }
}

const game_destroy = async (req, res) => {
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
  game_create,
  game_read,
  game_update,
  game_destroy,
}
