module.exports = app => {
  const geo = require('../controllers/geo');
  const router = require('express').Router();

  router.get('/', geo.get);

  app.use('/api/geo', router);
};
