'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const coordinatorFixtures = require('./fixtures/coordinator')
const faker = require('faker')

let sandbox = null
let db = null

let config = {
  logging: function () {}
}

let CoordinatorStub = {
  belongsTo: sinon.spy(),
  hasMany: sinon.spy()
}

let StudentStub = {
  belongsTo: sinon.spy(),
  hasMany: sinon.spy()
}

let UserStub = {
  hasMany: sinon.spy()
}

let UniversityStub = {
  hasMany: sinon.spy()
}

let BossStub = {
  belongsTo: sinon.spy()
}

let PlaceStub = {
  belongsTo: sinon.spy(),
  hasMany: sinon.spy()
}

let TutorStub = {
  belongsTo: sinon.spy()
}

// user id coordinator
let userId = 1

let single = Object.assign({}, coordinatorFixtures.single)

let newCoordinator = {
  phone: faker.phone.phoneNumber(),
  address: faker.address.streetAddress(),
  userId: 9999
}

let useridArgs = {
  where: { userId }
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  // Model create stub
  CoordinatorStub.create = sandbox.stub()
  CoordinatorStub.create.withArgs(newCoordinator).returns(Promise.resolve({
    toJSON () { return newCoordinator }
  }))

  // Model findOne stub
  CoordinatorStub.findOne = sandbox.stub()
  CoordinatorStub.findOne.withArgs(useridArgs).returns(Promise.resolve(coordinatorFixtures.byUserId(userId)))

  // Model update stub
  CoordinatorStub.update = sandbox.stub()
  CoordinatorStub.update.withArgs(single, useridArgs).returns(Promise.resolve(single))

  // Model deleteById stub
  CoordinatorStub.destroy = sandbox.stub()
  CoordinatorStub.destroy.withArgs(useridArgs).returns(Promise.resolve(1))

  const setupDatabase = proxyquire('../', {
    './models/student': () => StudentStub,
    './models/user': () => UserStub,
    './models/coordinator': () => CoordinatorStub,
    './models/university': () => UniversityStub,
    './models/boss': () => BossStub,
    './models/place': () => PlaceStub,
    './models/tutor': () => TutorStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('pass', t => {
  t.pass()
})

test.serial('Coordinator#createOrUpdate - new', async t => {
  let coordinator = await db.Coordinator.createOrUpdate(newCoordinator)

  t.true(CoordinatorStub.findOne.called, 'findOne should be called on model')
  t.true(CoordinatorStub.findOne.calledOnce, 'findOne should be called once')
  t.true(CoordinatorStub.findOne.calledWith({
    where: { userId: newCoordinator.userId }
  }), 'findOne should be called with id args')
  t.true(CoordinatorStub.create.called, 'create should be called on model')
  t.true(CoordinatorStub.create.calledOnce, 'create should be called once')
  t.true(CoordinatorStub.create.calledWith(newCoordinator), 'create should be called with specified args')

  t.deepEqual(coordinator, newCoordinator, 'user should be the same')
})

test.serial('Coordinator#createOrUpdate - exists', async t => {
  let coordinator = await db.Coordinator.createOrUpdate(single)

  t.true(CoordinatorStub.findOne.called, 'findOne should be called on model')
  t.true(CoordinatorStub.findOne.calledTwice, 'findOne should be called once')
  t.true(CoordinatorStub.findOne.calledWith({
    where: { userId: userId }
  }), 'findOne should be called with id student args')
  t.true(CoordinatorStub.update.called, 'create should be called on model')
  t.true(CoordinatorStub.update.calledOnce, 'update should be called once')
  t.true(CoordinatorStub.update.calledWith(single, useridArgs), 'update should be called with args single and studentArgs')

  t.deepEqual(coordinator, single)
})

test.serial('Coordinator#deleteById', async t => {
  let result = await db.Coordinator.deleteByUserId(single.userId)

  t.true(CoordinatorStub.destroy.called, 'deleteById should be called on model')

  t.deepEqual(result, 1)
})
