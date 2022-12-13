#! /usr/bin/env node

console.log('This script populates a databse with documents. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async')
const Game = require('./models/game');
const Publisher = require('./models/publisher');
const Platform = require('./models/platform');


const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const publishers = []
const platforms = []
const games = []

function publisherCreate(name, cb) {
    const publisher = new Publisher({ name: name });
       
    publisher.save(function (err) {
      if (err) {
        cb(err, null);
        return;
      }
      console.log('New Publisher: ' + publisher);
      publishers.push(publisher)
      cb(null, publisher);
    }   );
}

function platformCreate(name, cb) {
    const platform = new Platform({ name: name });
       
    platform.save(function (err) {
      if (err) {
        cb(err, null);
        return;
      }
      console.log('New Platform: ' + platform);
      platforms.push(platform)
      cb(null, platform);
    }   );
}

function gameCreate(title, summary, edition, review, price, discount, release, platform, publisher, cb) {
  gamedetail = { 
    title: title,
    summary: summary,
    edition: edition,
    review: review,
    price: price,
    discount: discount,
    release: release,
    platform: platform,
    publisher: publisher,
  }
    
  const game = new Game(gamedetail);    
  game.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Game: ' + game);
    games.push(game)
    cb(null, game)
  }  );
}

function createPlatforms(cb) {
    async.series([
        function(callback) {
            platformCreate("Nintendo Switch", callback);
        },
        function(callback) {
            platformCreate("Xbox One", callback);
        },
        function(callback) {
            platformCreate("Playstation 5", callback);
        },
        function(callback) {
            platformCreate("PC", callback);
        },
        ],
        // optional callback
        cb);
}

function createPublishers(cb) {
    async.series([
        function(callback) {
            publisherCreate("Sony", callback);
        },
        function(callback) {
            publisherCreate("Microsoft", callback);
        },
        function(callback) {
            publisherCreate("Square Enix", callback);
        },
        function(callback) {
            publisherCreate("Activision", callback);
        },
        ],
        // optional callback
        cb);
}

function createGames(cb) {
    async.parallel([
        function(callback) {
          gameCreate('A cool game',
          'This is a sample summary.',
           'Deluxe Edition',
           '9.8/10',
           59,
           9.9,
           '10/10/2022',
           platforms[0],
           publishers[0],
           callback
        );
        }
        ],
        // optional callback
        cb);
}

async.series([
    createPublishers,
    createPlatforms,
    createGames
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Games: '+games);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



