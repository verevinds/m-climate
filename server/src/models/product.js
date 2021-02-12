var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: { type: String, required: true },
    type: String,
    servicedArea: String,
    powerCooling: String,
    powerHeating: String,
    powerConsumptionCooling: String,
    powerConsumptionHeating: String,
    energyEfficiency: String,
    noiseInside: String,
    noiseOutside: String,
    sizeIndoor: String,
    sizeOutdoor: String,
    weightIndoor: String,
    weightOutdoor: String,
    warranty: String,
    description: String,
    price: Number,
    priceOld: Number,
    brand: { type: Schema.Types.ObjectId, ref: 'brand' },
    inStock: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

productSchema.pre('save', function(next){
    now = new Date();
    this.updatedAt = now;
    if(!this.createdAt) {
        this.createdAt = now
    }
    next();
});

var Product = mongoose.model('product', productSchema);
module.exports = Product;
