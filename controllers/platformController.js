const Game = require('../models/game');
const Platform = require('../models/platform');

const { body, validationResult } = require('express-validator');
const async = require('async');


const platform_create = async (req, res) => {
  try {
    await Platform.create({
      name: req.body.name,
    })
    console.log('Platform created! ('+req.body.name+')');
  } catch(err) {
    console.error(err);
  }   
}

const platform_read = async (req, res) => {
  try {
    await Platform.find()
  } catch(err) {
    console.error(err);
  }
}

const platform_update = async (req, res) => {
  try {
    await Platform.findByIdAndUpdate(
      { _id: id },
      { $set: { name: req.body.name } }
    )
    console.log(' Platform updated! ('+req.body.name+')');
  } catch(err) {
    console.error(err);
  }
}

const platform_destroy = async (req, res) => {
  try {
    await Platform.findByIdAndDelete(req.params.id);
    console.log('Platform deleted! ('+req.params.id+')');
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  platform_create,
  platform_read,
  platform_update,
  platform_destroy,
}
