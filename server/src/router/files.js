module.exports = app => {
  const files = require('../controllers/files');
  const router = require('express').Router();

  router.post('/', files.load);
  router.delete('/', files.delete);

  app.use('/api/files', router);
};
