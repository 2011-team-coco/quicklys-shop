const User = require('./user')
const Candy = require('./candy')
const Order = require('./order')
const OrderCandy = require('./orderCandy')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    Candy.belongsTo(User)
 */
User.hasMany(Order)
Order.belongsTo(User)
//Super Many-to-Many (allows us to eagerload any models)
Candy.belongsToMany(Order, {through: OrderCandy})
Order.belongsToMany(Candy, {through: OrderCandy})
Candy.hasMany(OrderCandy)
OrderCandy.belongsTo(Candy)
Order.hasMany(OrderCandy)
OrderCandy.belongsTo(Order)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Candy,
  Order,
  OrderCandy
}
