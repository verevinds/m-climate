module.exports = app => {
  const files = require('../controllers/files/load');
  const router = require('express').Router();

  router.post('/', files.load);

  app.use('/api/files', router);
};
