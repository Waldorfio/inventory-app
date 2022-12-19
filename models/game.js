const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    edition: { type: String, required: true },
    review: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    release: { type: Date, required: true, default: Date.now },
    // platform: [{ type: Schema.ObjectId, ref: "Platform" }],
    // publisher: [{ type: Schema.ObjectId, ref: "Publisher" }],
})

// Virtual properties
// GameSchema.virtual('url').get(function() {
//     return '/gameLibrary/game' + this._id;
// })

// Virtual for date formatting
GameSchema.virtual("release_formatted").get(function () {
    return DateTime.fromJSDate(this.release).toLocaleString(DateTime.DATE_MED);
  });

// Export model
module.exports = mongoose.model("Game", GameSchema);
