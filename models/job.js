'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupJobModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('job', {
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    type: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    state: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    postTime: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    placeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}
