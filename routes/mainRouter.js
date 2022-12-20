const express = require('express');
const router = express.Router();

// Require controllers
const gameController = require('../controllers/gameController');
const platformController = require('../controllers/platformController');

// GAME ROUTES
router.get('/games', gameController.games_page); // render games page
// CREATE
router.get('/game/create', gameController.game_create_get); // redirect to game create form
router.post('/game/create', gameController.game_create_post); // TODO ADD PLATFORM DROPDOWN, and RE-ENABLE MODEL
// READ
router.get('/game/:id', gameController.game_read);
// UPDATE
router.post('/game/:id', gameController.game_update);
// DESTROY
router.get('/game/:id/delete', gameController.game_destroy_get); // redirect to delete page, asking to confirm deletion
router.post('/game/:id/delete', gameController.game_destroy_post); // process delete.js submit button

// PLATFORM ROUTES
router.get('/platforms', platformController.platforms_page); // render platforms page
// CREATE
router.get('/platform/create', platformController.platform_create_get); // redirect to platform create form
router.post('/platform/create', platformController.platform_create_post);
// READ
router.get('/platform/:id', platformController.platform_read);
// UPDATE
router.post('/platform/:id', platformController.platform_update);
// DESTROY
router.get('/platform/:id/delete', platformController.platform_destroy_get); // redirect to delete page, asking to confirm deletion
router.post('/platform/:id/delete', platformController.platform_destroy_post); // process delete.js submit button

module.exports = router;
