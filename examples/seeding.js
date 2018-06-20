const db = require('../')
const faker = require('faker/locale/es')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const TOTAL_USERS = 36
const TOTAL_STUDENTS = 30
const TOTAL_COORDINATORS = 6
const TOTAL_UNIVERSITIES = 3

let userId = 1

var statePractice = ['busqueda', 'proceso', 'culminado']

async function run () {
  const config = {
    database: process.env.DB_NAME || 'jobby',
    username: process.env.DB_USER || 'admjobby',
    password: process.env.DB_PASS || '12345',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }

  const { User, Student, Coordinator, University} = await db(config).catch(handleFatalError)
  let swUsers = true
  let swStudents = true
  let swCoordinators = true
  let swUniversities = true

  if (swUsers) {
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
    console.log('User seeding success!')
  }

  /*
  const users = await User.findAll().catch(handleFatalError)
  console.log('--usuarios--')
  console.log(users)
  */
  
  if (swUniversities) {
    // seedings universities
    for (let i = 1; i <= TOTAL_UNIVERSITIES; i++) {
      const university = await University.createOrUpdate({
        id: i,
        name: 'University ' + faker.company.companyName(),
        address: faker.address.streetAddress(),
        url: faker.internet.url()
      }).catch(handleFatalError)
    }

    const universities = await University.findAll().catch(handleFatalError)
    console.log(universities)
    console.log('University seeding success!')
  }

  
  if (swCoordinators) {
    // seedings coordinators
    for (let i = 1; i <= TOTAL_COORDINATORS; i++) {
      const coordinator = await Coordinator.createOrUpdate({
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        userId: userId,
        universityId: getRandomInt(1, 4)
      }).catch(handleFatalError)
      userId++
    }
  
    console.log('Coordinator seeding success!')
  }

  if (swStudents) {
    // seedings student
    for (let i = 0; i < TOTAL_STUDENTS; i++) {
      const student = await Student.createOrUpdate({
        phone: faker.phone.phoneNumber(),
        city: faker.address.city(),
        state: statePractice[0],
        placeId: getRandomInt(1, 4),
        bossId: getRandomInt(1, 4),
        coordinatorId: getRandomInt(1, 7),
        universityId: getRandomInt(1, 4),
        userId: userId
      }).catch(handleFatalError)
      userId++
    }
    console.log('Student seeding success!')
  }
  console.log('Database seeding success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
