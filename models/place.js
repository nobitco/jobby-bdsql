'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupPlaceModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('place', {
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    city: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    country: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    avatar: {
      type: Sequelize.STRING(100),
      allowNull: true
    }
  })
}
