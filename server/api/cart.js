const router = require('express').Router({mergeParams: true})
const {User, Order, OrderCandy, Candy} = require('../db/models')
module.exports = router

// /users/:userId/cart/
router.get('/', async (req, res, next) => {
  try {
    console.log(req.params)
    const cart = await Order.findOne({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      where: {
        isCart: true,
        userId: req.params.userId
      },
      include: [
        {
          model: OrderCandy,
          attributes: ['id', 'quantity'],
          include: [Candy]
        }
      ]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
