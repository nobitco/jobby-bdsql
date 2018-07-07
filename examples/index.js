const db = require('../')
const faker = require('faker/locale/es')

const TOTAL_USERS = 5

async function run () {
  const config = {
    database: process.env.DB_NAME || 'jobby',
    username: process.env.DB_USER || 'admjobby',
    password: process.env.DB_PASS || '12345',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }

  const { User, Student } = await db(config).catch(handleFatalError)

  /*
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

  const users = await User.findAll().catch(handleFatalError)
  console.log('--usuarios--')
  console.log(users)

  let single = {
    username: 'Elena54'
  }

  const user = await User.findByUsername(single.username).catch(handleFatalError)
  console.log('--an user--')
  console.log(user)

  */

  /*
  const borrado = await User.deleteByUsername('juana.hanz').catch(handleFatalError)
  console.log('--usuario borrado--')
  if (borrado) {
    console.log('Deleted ok!')
  } else {
    console.log('Deleted fail!')
  }
  */

  /*
  STUDENTS
  */

  /*
  var statePractice = ['busqueda', 'proceso', 'culminado']

  const newStudent = {
    id: 1,
    phone: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: statePractice[0],
    userId:1,
    placeId:1,
    bossId:1,
    coordinatorId:1,
    universityId: 1,
    userId:1
  }

  const student = await Student.createOrUpdate(newStudent).catch(handleFatalError)
  */

  const students = await Student.findAll().catch(handleFatalError)
  console.log('--students--')
  console.log(students)

  const studentDeleted = await Student.deleteById(15).catch(handleFatalError)

  console.log('student deleted:')
  console.log(studentDeleted)

  process.exit(1)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
