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

router.get('/:id', async (req, res, next) => {
  try {
    const singleCandy = await Candy.findByPk(req.params.id)
    res.json(singleCandy)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const addedCandy = await Candy.create(req.body)
    res.send(addedCandy)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedCandy = await Candy.findByPk(req.params.id)
    await deletedCandy.destroy()
    res.sendStatus(202)
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const candy = await Candy.findByPk(req.params.id)
    await candy.update(req.body)
    res.send(candy)
  } catch (error) {
    next(error)
  }
})

module.exports = router
