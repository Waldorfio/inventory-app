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
    }
}

// CREATE
const game_create_get = async (req, res) => {
  try {
    res.render('platformform', {
        action: '/platform/create',
        name: 'Platform Example',
    });
  } catch(err) {
    console.error(err);
  }   
}
const platform_create_post = async (req, res) => {
  try {
    await Platform.create({
      name: req.body.name,
    })
    console.log('Platform created!');
    res.redirect('/');
  } catch(err) {
    console.error(err);
  }   
}

// READ
const platform_read = async (req, res) => {
  try {
    const foundPlatform = await Platform.findById(req.params.id);
    res.render('platformform', {
        action: '/platform/'+foundPlatform.id,
        name: foundPlatform.name,
    })
  } catch(err) {
    console.error(err);
  }
}

// UPDATE
const platform_update = async (req, res) => {
  try {
    await Platform.findByIdAndUpdate(
      { _id: req.params.id },
      { name: req.body.name }
    )
    console.log(' Platform updated!');
    res.redirect('/');
  } catch(err) {
    console.error(err);
  }
}

// DESTROY
const platform_destroy_get = async (req, res) => {
    try {
        res.render('deleteplatform');
    } catch(err) {
        console.error(err);
    }
}
const platform_destroy_post = async (req, res) => {
  try {
    await Platform.findByIdAndDelete(req.params.id);
    console.log('Platform deleted!');
    res.redirect('/');
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  platform_create_get,
  platform_create_post,
  platform_read,
  platform_update,
  platform_destroy_get,
  platform_destroy_post,
}
