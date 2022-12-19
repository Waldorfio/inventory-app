const express = require('express');
const router = express.Router();

// Require controllers
const gameController = require('../controllers/gameController');
const platformController = require('../controllers/platformController');

// GAME ROUTES
router.get('/games', gameController.index); // index
// CREATE
router.get('/game/create', gameController.game_create_get); // redirect to game create form
router.post('/game/create', gameController.game_create_post); // TODO ADD PLATFORM AND PUBLISHER DROPDOWN, and RE-ENABLE MODEL
// READ
router.get('/game/:id', gameController.game_read);
// UPDATE
router.post('/game/:id', gameController.game_update);
// DESTROY
router.get('/game/:id/delete', gameController.game_destroy_get); // redirect to delete page, asking to confirm deletion
router.post('/game/:id/delete', gameController.game_destroy_post); // process delete.js submit button

// PLATFORM ROUTES
router.post('./platform/create', platformController.platform_create); // CREATE
router.get('./platform/:id', platformController.platform_read); // READ
router.post('./platform/:id/update', platformController.platform_update); // UPDATE
router.post('./platform/:id', platformController.platform_destroy); // DESTROY

module.exports = router;
