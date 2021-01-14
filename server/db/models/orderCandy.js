const Sequelize = require('sequelize')
const db = require('../db')

const OrderCandy = db.define('order_candy', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
  // include historical price
})

module.exports = OrderCandy
