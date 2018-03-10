'use strict'

const db = require('./')
const debug = require('debug')('platziverse:db')
const inquirer = require('inquirer')
const chalk = require('chalk')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This destroy database! Are you sure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happened!')
  }

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
  console.error(`${chalk.red('[fatal error]')}  ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
