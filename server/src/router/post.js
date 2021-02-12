module.exports = app => {
  const post = require('../controllers/post');

  const router = require('express').Router();

  router.get('/', post.find);
  router.post('/', post.create);

  app.use('/post', router);
};
