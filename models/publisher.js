const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
    name: { type: String, required: true },
})

// Virtual properties
PublisherSchema.virtual('url').get(function() {
    return '/gameLibrary/publisher' + this._id;
})

// Export model
module.exports = mongoose.model("Publisher", PublisherSchema);
