const Banners = require('../../models/banners');

exports.find = require('./find')(Banners);
exports.findActual = require('./findActual')(Banners);
exports.create = require('./create')(Banners);
exports.delete = require('./delete')(Banners);
