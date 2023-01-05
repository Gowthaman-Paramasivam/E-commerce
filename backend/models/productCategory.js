const Sequelize = require("sequelize");

const sequelize = require("../database");

const productInfo = sequelize.define("productInfo", {
  product_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  category: {
    type: Sequelize.CHAR(50),
    allowNull: false
  },
  name: {
    type: Sequelize.CHAR(50),
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = productInfo;