'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const bossFixtures = require('./fixtures/boss')
const faker = require('faker')

let sandbox = null
let db = null

let config = {
  logging: function () {}
}

let BossStub = {
  belongsTo: sinon.spy()
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

let CoordinatorStub = {
  belongsTo: sinon.spy(),
  hasMany: sinon.spy()
}

let PlaceStub = {
  belongsTo: sinon.spy(),
  hasMany: sinon.spy()
}

let TutorStub = {
  belongsTo: sinon.spy()
}

let userId = 1

let single = Object.assign({}, bossFixtures.single)

let newBoss = {
  phone: faker.phone.phoneNumber(),
  userId: 9999
}

let useridArgs = {
  where: { userId }
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  // Model create stub
  BossStub.create = sandbox.stub()
  BossStub.create.withArgs(newBoss).returns(Promise.resolve({
    toJSON () { return newBoss }
  }))

  // Model findOne stub
  BossStub.findOne = sandbox.stub()
  BossStub.findOne.withArgs(useridArgs).returns(Promise.resolve(bossFixtures.byUserId(userId)))

  // Model update stub
  BossStub.update = sandbox.stub()
  BossStub.update.withArgs(single, useridArgs).returns(Promise.resolve(single))

  // Model deleteById stub
  BossStub.destroy = sandbox.stub()
  BossStub.destroy.withArgs(useridArgs).returns(Promise.resolve(1))

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

test.serial('Boss#createOrUpdate - new', async t => {
  let boss = await db.Boss.createOrUpdate(newBoss)

  t.true(BossStub.findOne.called, 'findOne should be called on model')
  t.true(BossStub.findOne.calledOnce, 'findOne should be called once')
  t.true(BossStub.findOne.calledWith({
    where: { userId: newBoss.userId }
  }), 'findOne should be called with id args')
  t.true(BossStub.create.called, 'create should be called on model')
  t.true(BossStub.create.calledOnce, 'create should be called once')
  t.true(BossStub.create.calledWith(newBoss), 'create should be called with specified args')

  t.deepEqual(boss, newBoss, 'user should be the same')
})

test.serial('Boss#createOrUpdate - exists', async t => {
  let boss = await db.Boss.createOrUpdate(single)

  t.true(BossStub.findOne.called, 'findOne should be called on model')
  t.true(BossStub.findOne.calledTwice, 'findOne should be called once')
  t.true(BossStub.findOne.calledWith({
    where: { userId: userId }
  }), 'findOne should be called with id student args')
  t.true(BossStub.update.called, 'create should be called on model')
  t.true(BossStub.update.calledOnce, 'update should be called once')
  t.true(BossStub.update.calledWith(single, useridArgs), 'update should be called with args single and studentArgs')

  t.deepEqual(boss, single)
})

test.serial('Boss#deleteById', async t => {
  let result = await db.Boss.deleteByUserId(single.userId)

  t.true(BossStub.destroy.called, 'deleteById should be called on model')

  t.deepEqual(result, 1)
})
