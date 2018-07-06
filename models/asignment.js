'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupAsignmentModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('asignment', {
    title: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    state: {
        type: Sequelize.STRING(1),
        allowNull: false
    },
    deliveryDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    studentId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}
