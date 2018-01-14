'use strict'

const setupDatabase = require('./lib/db')
const setupUserModel = require('./models/user')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const UserModel = setupUserModel(config)

  await sequelize.authenticate()

  const User = {}

  return {
    User
  }
}
