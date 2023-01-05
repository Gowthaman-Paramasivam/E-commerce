const Sequelize = require("sequelize");

const sequelize = require("../database");

const UserInfo = sequelize.define("userInfo", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.CHAR(50),
    allowNull: false
  },
  lastName: {
    type: Sequelize.CHAR(50),
    allowNull: true
  },
  gender: {
    type: Sequelize.CHAR(10),
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  }
})

module.exports = UserInfo;