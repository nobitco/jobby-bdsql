'use strict'

const setupDatabase = require('./lib/db')
const setupUserModel = require('./models/user')
const setupUser = require('./lib/user')
const setupStudentModel = require('./models/student')
const setupStudent = require('./lib/student')
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
  const UserModel = setupUserModel(config)
  const StudentModel = setupStudentModel(config)

  StudentModel.belongsTo(UserModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const User = setupUser(UserModel)
  const Student = setupStudent(StudentModel)

  return {
    User,
    Student
  }
}
