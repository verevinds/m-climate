module.exports = (app) => {
  const product = require('../controllers/product')
  const router = require('express').Router()

  router.get('/', product.find)
  router.post('/', product.create)
  router.delete('/:id', product.delete)

  app.use('/api/product', router)
}