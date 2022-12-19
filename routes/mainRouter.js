const express = require('express');
const router = express.Router();

// Require controllers
const gameController = require('../controllers/gameController');
const platformController = require('../controllers/platformController');
const publisherController = require('../controllers/publisherController');

// GAME ROUTES
router.get('/games', gameController.index); // index
// CREATE
router.get('/game/create', async (req, res) => {res.render('gameform', type: 'Create')}); // CREATE FORM
router.post('/game/create', gameController.game_create); // CREATE  // TODO ADD PLATFORM AND PUBLISHER DROPDOWN, and RE-ENABLE MODEL
// READ
router.get('/game/:id', gameController.game_read); // READ
// UPDATE
router.get('/game/:id/update', async (req, res) => {res.render('gameform', type: 'Update')}); // UPDATE FORM
router.post('/game/:id/update', gameController.game_update); // UPDATE
// DESTROY
router.post('/game/:id/delete', gameController.game_destroy); // DESTROY

// PLATFORM ROUTES
router.post('./platform/create', platformController.platform_create); // CREATE
router.get('./platform/:id', platformController.platform_read); // READ
router.post('./platform/:id/update', platformController.platform_update); // UPDATE
router.post('./platform/:id', platformController.platform_destroy); // DESTROY

// PUBLISHER ROUTES
router.post('./publisher/create', publisherController.publisher_create); // CREATE
router.get('./publisher/:id', publisherController.publisher_read); // READ
router.post('./publisher/:id/update', publisherController.publisher_update); // UPDATE
router.post('./publisher/:id', publisherController.publisher_destroy); // DESTROY

module.exports = router;
