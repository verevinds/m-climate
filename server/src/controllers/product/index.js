const Product = require('../../models/product');
const Brand = require('../../models/brand');

exports.find = require('./find')(Product);
exports.create = require('./create')(Product);
exports.delete = require('./delete')(Product);
