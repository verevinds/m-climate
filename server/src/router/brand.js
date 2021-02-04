module.exports = (app) => {
  const brand = require('../controllers/brand')
  const router = require('express').Router()

  router.get('/', brand.find)
  router.post('/', brand.create)

  app.use('/api/brand', router)
}