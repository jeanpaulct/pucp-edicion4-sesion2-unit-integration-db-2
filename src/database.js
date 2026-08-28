const { Sequelize } = require('sequelize');

// Configuración para SQLite en memoria (rápido y volátil para micro-proyectos)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false
});

module.exports = { sequelize };