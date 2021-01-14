const router = require('express').Router()
const {Candy} = require('../db/models')

/* All candies Routes */

//GET /api/candies/
router.get('/', async (req, res, next) => {
  try {
    const candies = await Candy.findAll({
      attributes: [
        'id',
        'name',
        'price',
        'imageUrl',
        'description',
        'quantity',
      ],
    })

    res.json(candies)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleCandy = await Candy.findByPk(req.params.id)
    res.json(singleCandy)
  } catch (error) {
    next(error)
  }
})

module.exports = router
