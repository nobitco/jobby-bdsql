'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupStudentModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('student', {
    studentCode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    identityCard: {
      type: Sequelize.STRING,
      allowNull: null
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })
}
