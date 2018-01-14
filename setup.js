'use strict'

const db = require('./')
const debug = require('debug')('platziverse:db')

async function setup () {
  const config = {
    database: process.env.DB_NAME || 'jobby',
    username: process.env.DB_USER || 'admjobby',
    password: process.env.DB_PASS || '12345',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    setup: true,
    logging: s => debug(s)
  }
  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()
