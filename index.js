'use strict'

const setupDatabase = require('./lib/db')
const setupUsuarioModel = require('./models/user')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      min: 0,
      max: 10,
      idle: 10000
    },
    query: {
      raw: 'true'
    }
  })

  const sequelize = setupDatabase(config)
  const UsuarioModel = setupUsuarioModel(config)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Usuario = {}

  return {
    Usuario
  }
}
