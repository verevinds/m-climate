/* eslint-disable no-unused-vars */
const Product = require('../../models/product');
const Brand = require('../../models/brand');

exports.find = require('./find')(Product);
exports.findOne = require('./findOne')(Product);
exports.findZip = require('./findZip')(Product);
exports.findPopular = require('./findPopular')(Product);
exports.findSimilar = require('./findSimilar')(Product);
exports.create = require('./create')(Product);
exports.delete = require('./delete')(Product);
exports.update = require('./update')(Product);
