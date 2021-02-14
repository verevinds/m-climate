const mongoose = require('mongoose');

const { Schema } = mongoose;

const brandSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

brandSchema.pre('save', next => {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Brand = mongoose.model('brand', brandSchema);
module.exports = Brand;
