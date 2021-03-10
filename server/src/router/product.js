module.exports = app => {
  const product = require('../controllers/product');
  const router = require('express').Router();

  router.get('/similar', product.findSimilar);
  router.get('/popular', product.findPopular);
  router.get('/zip', product.findZip);
  router.get('/', product.find);
  router.get('/:id', product.findOne);
  router.post('/', product.create);
  router.delete('/:id', product.delete);
  router.put('/:id', product.update);

  app.use('/api/product', router);
};
