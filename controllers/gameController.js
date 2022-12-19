const Game = require('../models/game');
const Platform = require('../models/platform');
const Publisher = require('../models/publisher');

const { body, validationResult } = require('express-validator');
const async = require('async');

// TODO: exports.index
const index = async (req, res, next) => {
    try {
        const game_list = await Game.find();
        console.log('List of all games: '+game_list);
        res.render('games', {
            testParam: 'testing 123',
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
    await Game.find() // TODO: Fix find function
  } catch(err) {
    console.error(err);
  }
}

const game_update = async (req, res) => {
  try {
    await Game.findByIdAndUpdate(
      { _id: id },
      { $set: { 
        title: req.body.title,
        summary: req.body.summary,
        edition: req.body.edition,
        review: req.body.review,
        price: req.body.price,
        discount: req.body.discount,
        release: req.body.release,
//         platform: req.body.platform, // TODO ADD PLATFORM AND PUBLISHER DROPDOWN, and RE-ENABLE MODEL
//         publisher: req.body.publisher, // TODO ADD PLATFORM AND PUBLISHER DROPDOWN, and RE-ENABLE MODEL
        } }
    )
    console.log('Game updated! ('+newGame+')');
    res.redirect('/');
  } catch(err) {
    console.error(err);
  }
}

const game_destroy = async (req, res) => {
    const response = confirm("Delete game?");
    if (response) {
        try {
            const foundGame = await Publisher.findByIdAndDelete(req.params.id);
            console.log('Game deleted! ('+foundGame+')');
            res.redirect('/games');
        } catch(err) {
            console.error(err);
        }
    } else {
        console.log('Game not deleted.');
        res.redirect('/games');
    }
}

module.exports = {
  index,
  game_create,
  game_read,
  game_update,
  game_destroy,
}
