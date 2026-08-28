const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Coupon = sequelize.define('Coupon', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  discount_percentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Coupon;