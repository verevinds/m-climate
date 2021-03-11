const mongoose = require('mongoose');

const { Schema } = mongoose;

const portfolioSchema = new Schema({
  url: { type: String, required: true },
  path: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

portfolioSchema.pre('save', next => {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Portfolio = mongoose.model('portfolio', portfolioSchema);
module.exports = Portfolio;
