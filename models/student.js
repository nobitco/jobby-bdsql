'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupStudentModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('student', {
    phone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    placeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bossId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    coordinatorId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    universityId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}
