'use strict'

const setupDatabase = require('./lib/db')
const setupUserModel = require('./models/user')
const setupStudentModel = require('./models/student')
const setupCoordinatorModel = require('./models/coordinator')
const setupUniversityModel = require('./models/university')
const setupBossModel = require('./models/boss')
const setupPlaceModel = require('./models/place')
const setupUser = require('./lib/user')
const setupStudent = require('./lib/student')
const setupCoordinator = require('./lib/coordinator')
const setupUniversity = require('./lib/university')
const setupBoss = require('./lib/boss')
const setupPlace = require('./lib/place')
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
  const BossModel = setupBossModel(config)
  const PlaceModel = setupPlaceModel(config)

  StudentModel.belongsTo(UserModel)
  CoordinatorModel.belongsTo(UserModel)
  CoordinatorModel.hasMany(StudentModel)
  UniversityModel.hasMany(CoordinatorModel)
  BossModel.belongsTo(UserModel)
  PlaceModel.belongsTo(UserModel)
  PlaceModel.hasMany(BossModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const User = setupUser(UserModel)
  const Student = setupStudent(StudentModel)
  const Coordinator = setupCoordinator(CoordinatorModel)
  const University = setupUniversity(UniversityModel)
  const Boss = setupBoss(BossModel)
  const Place = setupPlace(PlaceModel)

  return {
    User,
    Student,
    Coordinator,
    University,
    Boss,
    Place
  }
}
