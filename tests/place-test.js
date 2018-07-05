'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const placeFixtures = require('./fixtures/place')
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
  belongsTo: sinon.spy()
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
  belongsTo: sinon.spy(),
}

// user id coordinator
let userId = 1

let single = Object.assign({}, placeFixtures.single)

let newPlace = {
  name: faker.company.companyName(),
  phone: faker.phone.phoneNumber(),
  city: faker.address.city(),
  country: faker.address.country(),
  address: faker.address.streetAddress(),
  avatar: faker.internet.avatar(),
  userId: 9999
}

let useridArgs = {
  where: { userId }
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  // Model create stub
  PlaceStub.create = sandbox.stub()
  PlaceStub.create.withArgs(newPlace).returns(Promise.resolve({
    toJSON () { return newPlace }
  }))

  // Model findOne stub
  PlaceStub.findOne = sandbox.stub()
  PlaceStub.findOne.withArgs(useridArgs).returns(Promise.resolve(placeFixtures.byUserId(userId)))

  // Model update stub
  PlaceStub.update = sandbox.stub()
  PlaceStub.update.withArgs(single, useridArgs).returns(Promise.resolve(single))

  // Model deleteById stub
  PlaceStub.destroy = sandbox.stub()
  PlaceStub.destroy.withArgs(useridArgs).returns(Promise.resolve(1))

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

test.serial('Place#createOrUpdate - new', async t => {
  let place = await db.Place.createOrUpdate(newPlace)

  t.true(PlaceStub.findOne.called, 'findOne should be called on model')
  t.true(PlaceStub.findOne.calledOnce, 'findOne should be called once')
  t.true(PlaceStub.findOne.calledWith({
    where: { userId: newPlace.userId }
  }), 'findOne should be called with id args')
  t.true(PlaceStub.create.called, 'create should be called on model')
  t.true(PlaceStub.create.calledOnce, 'create should be called once')
  t.true(PlaceStub.create.calledWith(newPlace), 'create should be called with specified args')

  t.deepEqual(place, newPlace, 'user should be the same')
})

test.serial('Place#createOrUpdate - exists', async t => {
  let place = await db.Place.createOrUpdate(single)

  t.true(PlaceStub.findOne.called, 'findOne should be called on model')
  t.true(PlaceStub.findOne.calledTwice, 'findOne should be called once')
  t.true(PlaceStub.findOne.calledWith({
    where: { userId: userId }
  }), 'findOne should be called with id student args')
  t.true(PlaceStub.update.called, 'create should be called on model')
  t.true(PlaceStub.update.calledOnce, 'update should be called once')
  t.true(PlaceStub.update.calledWith(single, useridArgs), 'update should be called with args single and studentArgs')

  t.deepEqual(place, single)
})

test.serial('Place#deleteById', async t => {
  let result = await db.Place.deleteByUserId(single.userId)

  t.true(PlaceStub.destroy.called, 'deleteById should be called on model')

  t.deepEqual(result, 1)
})
