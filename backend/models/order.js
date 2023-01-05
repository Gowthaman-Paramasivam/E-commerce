const Sequelize = require("sequelize");

const sequelize = require("../database");

const OrderInfo = sequelize.define("orderInfo", {
  order_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.CHAR(50),
    allowNull: false
  },
  order_status: {
    type: Sequelize.CHAR(50),
    allowNull: false
  },
  total_price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderInfo;