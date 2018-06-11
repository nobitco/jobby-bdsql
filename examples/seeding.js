const db = require('../')
const faker = require('faker/locale/es')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const TOTAL_USERS = 20
const TOTAL_STUDENTS = 20
var statePractice = ['busqueda', 'proceso', 'culminado']

async function run () {
  const config = {
    database: process.env.DB_NAME || 'jobby',
    username: process.env.DB_USER || 'admjobby',
    password: process.env.DB_PASS || '12345',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }

  const { User, Student } = await db(config).catch(handleFatalError)

  // seedings users

  for (var i = 0; i < TOTAL_USERS; i++) {
    const user = await User.createOrUpdate({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      emailToken: faker.random.uuid(),
      emailVerified: false,
      passwordVerified: false,
      avatar: faker.image.avatar()
    }).catch(handleFatalError)
  }

  /*
  const users = await User.findAll().catch(handleFatalError)
  console.log('--usuarios--')
  console.log(users)
  console.log('Database seeding success!')
  */

  // seeings student

  for (let i = 0; i < TOTAL_STUDENTS; i++) {
    const student = await Student.createOrUpdate({
      phone: faker.phone.phoneNumber(),
      city: faker.address.city(),
      state: statePractice[0],
      placeId: getRandomInt(1, 4),
      bossId: getRandomInt(1, 4),
      coordinatorId: getRandomInt(1, 4),
      universityId: getRandomInt(1, 4),
      userId: i + 1
    }).catch(handleFatalError)
  }

  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
