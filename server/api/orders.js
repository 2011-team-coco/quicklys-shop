const router = require('express').Router({mergeParams: true})
const {User, Order, OrderCandy, Candy} = require('../db/models')
module.exports = router

// /api/orders/:cartId
router.post('/:cartId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(+req.params.cartId, {
      include: [
        {
          model: OrderCandy,
          attributes: [['id', 'orderCandyId'], 'quantity'],
          include: [
            {
              model: Candy,
              attributes: [
                ['id', 'candyId'],
                'name',
                'price',
                'imageUrl',
                'quantity',
              ],
            },
          ],
        },
      ],
    })
    if (!order) throw new Error('Validation error')

    // TODO: validate that order.userId matches the session's userId OR user is admin
    // if not, throw an error
    if (req.user && req.user.id === order.userId) {
      // update the order's cart flag
      await order.update({isCart: false})
      res.json(order)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})
