var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brandSchema = new Schema({
    name: { type: String, required: true },
});

var Brand = mongoose.model('brand', brandSchema);
module.exports = Brand;
