'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupBoosModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('boss', {
    position: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING(50),
      allowNull: true
    }
  })
}
