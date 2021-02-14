/* eslint-disable no-unused-vars */
const Post = require('../../models/post');
const User = require('../../models/user');

exports.create = require('./create')(Post);
exports.find = require('./find')(Post);
