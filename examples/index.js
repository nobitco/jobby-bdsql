const db = require('../')

async function run () {
  const config = {
    database: process.env.DB_NAME || 'jobby',
    username: process.env.DB_USER || 'admjobby',
    password: process.env.DB_PASS || '12345',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }

  const { User } = await db(config).catch(handleFatalError)

  const user = await User.createOrUpdate({
    username: 'ccolascoaga',
    password: '54321'
  }).catch(handleFatalError)

  console.log('--usuario--')
  console.log(user)

  const users = await User.findAll().catch(handleFatalError)
  console.log('--usuarios--')
  console.log(users)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
