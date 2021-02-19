module.exports = app => {
  const banners = require('../controllers/banners');
  const router = require('express').Router();

  router.get('/', banners.find);
  router.get('/actual', banners.findActual);
  router.post('/', banners.create);
  router.delete('/:id', banners.delete);

  app.use('/api/banners', router);
};
