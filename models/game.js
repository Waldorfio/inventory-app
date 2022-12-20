const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String },
    edition: { type: String, required: true },
    review: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    release: { type: Date, required: true, default: Date.now },
    platform: { type: String, required: true },
    // platform: [{ type: Schema.ObjectId, ref: "Platform" }]
})

// Virtual for date formatting
GameSchema.virtual("release_formatted").get(function () {
    return DateTime.fromJSDate(this.release).toLocaleString(DateTime.DATE_MED);
  });

// Export model
module.exports = mongoose.model("Game", GameSchema);