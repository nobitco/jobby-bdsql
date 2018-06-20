'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupUniversityModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('university', {
    name: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })
}
