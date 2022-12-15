const Game = require('../models/game');
const Publisher = require('../models/publisher');

const { body, validationResult } = require('express-validator');
const async = require('async');

const publisher_create = async (req, res) => {
  try {
    await Publisher.create({
      name: req.body.name,
    })
    console.log('Publisher created! ('+req.body.name+')');
  } catch(err) {
    console.error(err);
  }   
}

const publisher_read = async (req, res) => {
  try {
    await Publisher.find()
  } catch(err) {
    console.error(err);
  }
}

const publisher_update = async (req, res) => {
  try {
    await Publisher.findByIdAndUpdate(
      { _id: id },
      { $set: { name: req.body.name } }
    )
    console.log('Publisher updated! ('+req.body.name+')');
  } catch(err) {
    console.error(err);
  }
}

const publisher_destroy = async (req, res) => {
  try {
    await Publisher.findByIdAndDelete(req.params.id);
    console.log('Publisher deleted! ('+req.params.id+')');
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  publisher_create,
  publisher_read,
  publisher_update,
  publisher_destroy,
}
