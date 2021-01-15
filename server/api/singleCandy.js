const router = require('express').Router()
const {Candy} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    const singleCandy = await Candy.findByPk(req.params.id)
    res.json(singleCandy)
  } catch (error) {
    next(error)
  }
})

module.exports = router
