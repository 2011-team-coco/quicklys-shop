const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.use('/:userId/cart', require('./carts.js'))

router.get('/', async (req, res, next) => {
  try {
    if (req.session.passport) {
      if (req.session.passport.user === 1) {
        const users = await User.findAll({
          attributes: ['id', 'email', 'isAdmin'],
        })
        res.json(users)
      } else {
        res.json({notAllowed: 'Unauthorized'})
        console.log('user ID: undefined')
      }
    } else {
      res.json({notAllowed: 'Unauthorized'})
      console.log('user ID: undefined')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (req.session.passport) {
      if (req.session.passport.user === 1) {
        const singleUser = await User.findByPk(req.params.id)
        res.json(singleUser)
      } else {
        res.json({notAllowed: 'Unauthorized'})
        console.log('user ID: undefined')
      }
    } else {
      res.json({notAllowed: 'Unauthorized'})
      console.log('user ID: undefined')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const addedUser = await User.create(req.body)
    res.send(addedUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedUser = await User.findByPk(req.params.id)
    await deletedUser.destroy()
    res.sendStatus(202)
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.update(req.body)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
