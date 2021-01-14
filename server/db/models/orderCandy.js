const Sequelize = require('sequelize')
const db = require('../db')

const OrderCandy = db.define('order_candy', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = OrderCandy
