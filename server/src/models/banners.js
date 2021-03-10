const mongoose = require('mongoose');

const { Schema } = mongoose;

const bannersSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  enable: { type: Boolean, default: true },
  dateEnd: { type: Date, default: new Date(3000, 1, 1) },
  path: String,
  href: String,
  city: { type: String, default: 'Novosibirsk' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

bannersSchema.pre('save', next => {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Banners = mongoose.model('banners', bannersSchema);
module.exports = Banners;
