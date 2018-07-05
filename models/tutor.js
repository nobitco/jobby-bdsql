'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupTutorModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('tutor', {
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
