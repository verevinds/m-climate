module.exports = app => {
  const service = require('../controllers/service');
  const router = require('express').Router();

  router.get('/', service.find);
  router.post('/', service.create);
  router.delete('/:id', service.delete);

  app.use('/api/service', router);
};
