const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
    name: { type: String, required: true },
})

// Virtual properties
// PlatformSchema.virtual('url').get(function() {
//     return '/gameLibrary/platform' + this._id;
// })

// Export model
module.exports = mongoose.model("Platform", PlatformSchema);
