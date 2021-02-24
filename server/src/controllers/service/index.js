/* eslint-disable no-unused-vars */
const Service = require('../../models/service');

exports.find = require('./find')(Service);
exports.create = require('./create')(Service);
exports.delete = require('./delete')(Service);
