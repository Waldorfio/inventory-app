const express = require('express');
const router = express.Router();

// Require controllers
const game_controller = require('../controllers/gameController');
const platform_controller = require('../controllers/platformController');
const publisher_controller = require('../controllers/publisherController');

//homepage
router.get('/', game_controller.index);

// GAME ROUTES
//creating a game
router.get('/game/create', game_controller.game_create_get);
router.post('game/create', game_controller.game_create_post);
//update game
router.get('/game/:id/update', game_controller.game_update_get);
router.post('/game/:id/update', game_controller.game_update_post);
//delete game
router.get('/game/:id/delete', game_controller.game_delete_get);
router.post('/game/:id/delete', game_controller.game_delete_post);
//read one game
router.get('/game/:id', game_controller.game_detail);
//read all games
router.get('/games', game_controller.game_list);

// PUBLISHER ROUTES
//creating a publisher
router.get('/publisher/create', publisher_controller.publisher_create_get);
router.post('publisher/create', publisher_controller.publisher_create_post);
//update publisher
router.get('/publisher/:id/update', publisher_controller.publisher_update_get);
router.post('/publisher/:id/update', publisher_controller.publisher_update_post);
//delete publisher
router.get('/publisher/:id/delete', publisher_controller.publisher_delete_get);
router.post('/publisher/:id/delete', publisher_controller.publisher_delete_post);
//read one publisher
router.get('/publisher/:id', publisher_controller.publisher_detail);
//read all publishers
router.get('/publishers', publisher_controller.publisher_list);

// PLATFORM ROUTES
//creating a platform
router.get('/platform/create', platform_controller.platform_create_get);
router.post('platform/create', platform_controller.platform_create_post);
//update platform
router.get('/platform/:id/update', platform_controller.platform_update_get);
router.post('/platform/:id/update', platform_controller.platform_update_post);
//delete platform
router.get('/platform/:id/delete', platform_controller.platform_delete_get);
router.post('/platform/:id/delete', platform_controller.platform_delete_post);
//read one platform
router.get('/platform/:id', platform_controller.platform_detail);
//read all platforms
router.get('/platforms', platform_controller.platform_list);


module.exports = router;
