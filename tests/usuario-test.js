'use strict'

const test = require('ava')

let db = null
let config = {
  logging: function () {}
}

test.beforeEach(async () => {
  const setupDatabase = require('../')

  db = await setupDatabase(config)
})

test('pass', t => {
  t.pass()
})

test('Usuario', t => {
  t.truthy(db.Usuario, 'Usuario must exist!')
})
