const db = require('../')
const faker = require('faker/locale/es')
const TOTAL_USERS = 20

async function run () {
  const config = {
    database: process.env.DB_NAME || 'jobby',
    username: process.env.DB_USER || 'admjobby',
    password: process.env.DB_PASS || '12345',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }

  const { User, Student } = await db(config).catch(handleFatalError)

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

  for (var i = 0; i < TOTAL_USERS; i++) {
    const student = await Student.createOrUpdate({
      studentCode: faker.helpers.userCard(),
      identityCard: faker.helpers.userCard(),
      state: 2,
      city: faker.address.city(),
      phone: faker.phone.phoneNumber()
    })
  }

  const users = await User.findAll().catch(handleFatalError)
  console.log('--usuarios--')
  console.log(users)
  console.log('Database seeding success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
