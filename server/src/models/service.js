const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

serviceSchema.pre('save', next => {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Service = mongoose.model('service', serviceSchema);
module.exports = Service;
