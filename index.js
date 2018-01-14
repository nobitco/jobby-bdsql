'use strict'

const setupDatabase = require('./lib/db')
const setupUserModel = require('./models/user')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const UserModel = setupUserModel(config)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const User = {}

  return {
    User
  }
}
