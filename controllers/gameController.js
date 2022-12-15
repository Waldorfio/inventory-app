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
  } catch(err) {
    console.error(err);
}

const game_create = async (req, res) => {
  try {
    await Game.create({
      name: req.body.name, // TODO: Add other document fields for game
    })
    console.log('Game created! ('+req.body.name+')');
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
      { $set: { name: req.body.name } }  // TODO: Clarify
    )
    console.log('Game updated! ('+req.body.name+')');
  } catch(err) {
    console.error(err);
  }
}

const game_destroy = async (req, res) => {
  try {
    await Publisher.findByIdAndDelete(req.params.id);
    console.log('Game deleted! ('+req.params.id+')');
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
