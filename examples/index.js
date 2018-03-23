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

  const { User } = await db(config).catch(handleFatalError)

  for (var i = 0; i < TOTAL_USERS; i++) {
    const user = await User.createOrUpdate({
      username: faker.internet.userName(),
      password: faker.internet.password()
    }).catch(handleFatalError)
  }

  const users = await User.findAll().catch(handleFatalError)
  console.log('--usuarios--')
  console.log(users)

  /*
  const borrado = await User.deleteByUsername('juana.hanz').catch(handleFatalError)
  console.log('--usuario borrado--')
  if (borrado) {
    console.log('Deleted ok!')
  } else {
    console.log('Deleted fail!')
  }
  */
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
