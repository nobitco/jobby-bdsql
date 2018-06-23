'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const universityFixtures = require('./fixtures/university')
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

// id university
let id = 1

let single = Object.assign({}, universityFixtures.single)

let newUniversity = {
  id: 3424,
  name: 'University ' + faker.company.companyName(),
  address: faker.address.streetAddress(),
  url: faker.internet.url()
}

let idArgs = {
  where: { id }
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  // Model findOne stub
  UniversityStub.findOne = sandbox.stub()
  UniversityStub.findOne.withArgs(idArgs).returns(Promise.resolve(universityFixtures.byId(id)))

  // Model stub create
  UniversityStub.create = sandbox.stub()
  UniversityStub.create.withArgs(newUniversity).returns(Promise.resolve({
    toJSON () { return newUniversity }
  }))

  // Model update stub
  UniversityStub.update = sandbox.stub()
  UniversityStub.update.withArgs(single, idArgs).returns(Promise.resolve(single))

  // Model deleteById stub
  UniversityStub.destroy = sandbox.stub()
  UniversityStub.destroy.withArgs(idArgs).returns(Promise.resolve(1))

  const setupDatabase = proxyquire('../', {
    './models/student': () => StudentStub,
    './models/user': () => UserStub,
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

test.serial('University#createOrUpdate - new', async t => {
  let university = await db.University.createOrUpdate(newUniversity)

  t.true(UniversityStub.findOne.called, 'findOne should be called on model')
  t.true(UniversityStub.findOne.calledOnce, 'findOne should be called once')
  t.true(UniversityStub.findOne.calledWith({
    where: { id: newUniversity.id }
  }), 'findOne should be called with id args')
  t.true(UniversityStub.create.called, 'create should be called on model')
  t.true(UniversityStub.create.calledOnce, 'create should be called once')
  t.true(UniversityStub.create.calledWith(newUniversity), 'create should be called with specified args')

  t.deepEqual(university, newUniversity, 'user should be the same')
})

test.serial('University#createOrUpdate - exists', async t => {
  let university = await db.University.createOrUpdate(single)

  t.true(UniversityStub.findOne.called, 'findOne should be called on model')
  t.true(UniversityStub.findOne.calledTwice, 'findOne should be called once')
  t.true(UniversityStub.findOne.calledWith({
    where: { id: id }
  }), 'findOne should be called with id student args')
  t.true(UniversityStub.update.called, 'create should be called on model')
  t.true(UniversityStub.update.calledOnce, 'update should be called once')
  t.true(UniversityStub.update.calledWith(single, idArgs), 'update should be called with args single and studentArgs')

  t.deepEqual(university, single)
})

test.serial('University#deleteById', async t => {
  let result = await db.University.deleteById(single.id)

  t.true(UniversityStub.destroy.called, 'deleteById should be called on model')

  t.deepEqual(result, 1)
})
