module.exports = app => {
  const portfolio = require('../controllers/portfolio');
  const router = require('express').Router();

  router.get('/', portfolio.find);
  router.post('/', portfolio.create);
  router.delete('/:id', portfolio.delete);

  app.use('/api/portfolio', router);
};
