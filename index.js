'use strict'

const setupDatabase = require('./lib/db')
const setupUserModel = require('./models/user')
const setupStudentModel = require('./models/student')
const setupCoordinatorModel = require('./models/coordinator')
const setupUniversityModel = require('./models/university')
const setupUser = require('./lib/user')
const setupStudent = require('./lib/student')
const setupCoordinator = require('./lib/coordinator')
const setupUniversity = require('./lib/university')
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
  const CoordinatorModel = setupCoordinatorModel(config)
  const UniversityModel = setupUniversityModel(config)

  StudentModel.belongsTo(UserModel)
  CoordinatorModel.belongsTo(UserModel)
  CoordinatorModel.hasMany(StudentModel)
  UniversityModel.hasMany(CoordinatorModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const User = setupUser(UserModel)
  const Student = setupStudent(StudentModel)
  const Coordinator = setupCoordinator(CoordinatorModel)
  const University = setupUniversity(UniversityModel)

  return {
    User,
    Student,
    Coordinator,
    University
  }
}
