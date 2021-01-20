const router = require('express').Router({mergeParams: true})
const {User, Order, OrderCandy, Candy} = require('../db/models')
module.exports = router

const authorizeUser = (req, res, next) => {
  if (req.user && req.user.id.toString() === req.params.userId) {
    next()
  } else {
    res.sendStatus(401)
  }
}

// /users/:userId/cart/
router.get('/', authorizeUser, async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.params.userId)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// /users/:userId/cart/candy/:candyId
router.post('/candy/:candyId', authorizeUser, async (req, res, next) => {
  try {
    // get current cart for orderId
    let cart = await Order.findOne({
      where: {
        isCart: true,
        userId: req.params.userId,
      },
    })
    if (!cart) {
      cart = await Order.create({
        userId: req.params.userId,
        isCart: true,
      })
    }

    // create new through table entry
    await OrderCandy.create({
      orderId: cart.id,
      candyId: req.params.candyId,
      quantity: req.body.quantity,
    })

    // get updated cart to return to client
    const updatedCart = await getOrCreateCart(req.params.userId)

    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

// /users/:userId/cart/candy/:candyId
router.put('/candy/:candyId', authorizeUser, async (req, res, next) => {
  try {
    // get active cart
    const cart = await Order.findOne({
      where: {
        isCart: true,
        userId: req.params.userId,
      },
    })
    if (!cart) throw new Error('Validation error')

    // look up entry in through table - order_candy to update quantity
    const orderCandyToUpdate = await OrderCandy.findOne({
      where: {
        orderId: cart.id,
        candyId: req.params.candyId,
      },
    })
    if (!orderCandyToUpdate) {
      throw new Error('Validation error')
    }

    //update quantity
    await orderCandyToUpdate.update({
      quantity: req.body.quantity,
    })

    // get updated cart to return to client
    const updatedCart = await getOrCreateCart(req.params.userId)

    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

router.delete('/candy/:candyId', authorizeUser, async (req, res, next) => {
  try {
    // get active cart
    const cart = await Order.findOne({
      where: {
        isCart: true,
        userId: req.params.userId,
      },
    })
    if (!cart) throw new Error('Validation error')

    // look up order_candy to update quantity
    const orderCandyToDelete = await OrderCandy.findOne({
      where: {
        orderId: cart.id,
        candyId: req.params.candyId,
      },
    })
    if (!orderCandyToDelete) {
      throw new Error('Validation error')
    }

    //update quantity
    await orderCandyToDelete.destroy()

    // get updated cart to return to client
    const updatedCart = await getOrCreateCart(req.params.userId)

    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

const getOrCreateCart = async (userId) => {
  const includeQuery = [
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
  ]

  // look up cart by user Id
  let cart = await Order.findOne({
    where: {
      isCart: true,
      userId: userId,
    },
    attributes: [['id', 'cartId'], 'userId'],
    include: includeQuery,
  })

  // if cart does not exist, create new cart
  if (!cart) {
    const newCart = await Order.create({
      userId: userId,
      isCart: true,
    })
    //get cart to eager load with includeQuery
    cart = await Order.findByPk(newCart.id, {
      attributes: [['id', 'cartId'], 'userId'],
      include: includeQuery,
    })
  }

  return cart
}
