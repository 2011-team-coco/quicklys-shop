const router = require('express').Router()
const {Candy} = require('../db/models')

/* All candies Routes */

//GET /api/candies/
router.get('/', async (req, res, next) => {
  try {
    const candies = await Candy.findAll({
      attributes: ['id', 'name', 'price', 'imageUrl', 'description', 'quantity']
    })

    res.json(candies)
  } catch (err) {
    next(err)
  }
})

module.exports = router
