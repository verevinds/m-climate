const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
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
  price: { type: Number, default: 0 },
  priceOld: { type: Number, default: 0 },
  brand: { type: Schema.Types.ObjectId, ref: 'brand' },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  images: [
    {
      url: String,
      filename: String,
      path: String,
    },
  ],
  city: { type: String, default: 'Novosibirsk' },
});

productSchema.pre('save', next => {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;
