var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brandSchema = new Schema({
    name: { type: String, required: true },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

brandSchema.pre('save', function(next){
    now = new Date();
    this.updatedAt = now;
    if(!this.createdAt) {
        this.createdAt = now
    }
    next();
});

var Brand = mongoose.model('brand', brandSchema);
module.exports = Brand;
