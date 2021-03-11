const Portfolio = require('../../models/portfolio');

exports.find = require('./find')(Portfolio);
exports.create = require('./create')(Portfolio);
exports.delete = require('./delete')(Portfolio);
