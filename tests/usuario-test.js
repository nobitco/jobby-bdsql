'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const userFixtures = require('./fixtures/user')

let db = null
let config = {
  logging: function () {}
}

let StudentStub = {
  belongsTo: sinon.spy()
}

let CoordinatorStub = {
  belongsTo: sinon.spy(),
  hasMany: sinon.spy()
}

let UniversityStub = {
  hasMany: sinon.spy()
}

let UserStub = null
let sandbox = null
let username = 'jamarquez'

let single = Object.assign({}, userFixtures.single)

let newUser = {
  username: 'coolascoaga',
  password: 'secret'
}

let usernameArgs = {
  where: { username }
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  UserStub = {
    hasMany: sandbox.spy()
  }

  // Model create Stub
  UserStub.create = sandbox.stub()
  UserStub.create.withArgs(newUser).returns(Promise.resolve({
    toJSON () { return newUser }
  }))

  // Model findOne Stub
  UserStub.findOne = sandbox.stub()
  UserStub.findOne.withArgs(usernameArgs).returns(Promise.resolve(userFixtures.byUsername(username)))

  // Model update Stub
  UserStub.update = sandbox.stub()
  UserStub.update.withArgs(single, usernameArgs).returns(Promise.resolve(single))

  const setupDatabase = proxyquire('../', {
    './models/user': () => UserStub,
    './models/student': () => StudentStub,
    './models/coordinator': () => CoordinatorStub,
    './models/university': () => UniversityStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('pass', t => {
  t.pass()
})

test('User', t => {
  t.truthy(db.User, 'Usuario must exist!')
})

test.serial('User#createOrUpdate - new', async t => {
  let user = await db.User.createOrUpdate(newUser)

  t.true(UserStub.findOne.called, 'findOne should be called on model')
  t.true(UserStub.findOne.calledOnce, 'findOne should be called once')
  t.true(UserStub.findOne.calledWith({
    where: { username: newUser.username }
  }), 'findOne should be called with username args')
  t.true(UserStub.create.called, 'create should be called on model')
  t.true(UserStub.create.calledOnce, 'create should be called once')
  t.true(UserStub.create.calledWith(newUser), 'create should be called with specified args')

  t.deepEqual(user, newUser, 'user should be the same')
})

test.serial('User#createOrUpdate - exists', async t => {
  let user = await db.User.createOrUpdate(single)

  t.true(UserStub.findOne.called, 'findOne should be called on model')
  t.true(UserStub.findOne.calledTwice, 'findOne should be called twice')
  t.true(UserStub.findOne.calledWith(usernameArgs), 'findOne should be called with username args')
  t.true(UserStub.update.called, 'user.update called on model')
  t.true(UserStub.update.calledOnce, 'user.update should be called once')
  t.true(UserStub.update.calledWith(single), 'agent.update should be called with specified args')

  t.deepEqual(user, single, 'user should be the same')
})

test.serial('User#findByUsername', async t => {
  let user = await db.User.findByUsername(single.username)

  t.true(UserStub.findOne.called, 'findOne should be called on model')
  t.true(UserStub.findOne.calledOnce, 'findOne should be called once')
  t.true(UserStub.findOne.calledWith(usernameArgs), 'findOne should be called with username')

  t.deepEqual(user, single, 'user should be the same')
})
