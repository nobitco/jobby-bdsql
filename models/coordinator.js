'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupCoordinatorModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('coordinator', {
    phone: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })
}
