const Brand = require('../../models/brand');

exports.find = require('./find')(Brand);
exports.create = require('./create')(Brand);
exports.delete = require('./delete')(Brand);
