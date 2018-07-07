'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const asignmentFixtures = require('./fixtures/asignment')
const faker = require('faker')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

var abc = 'ABCDEFGHIJKLMNÑOPQRSTUWXYZ'

let db = null
let config = {
  logging: function () {}
}

let UserStub = null

let CoordinatorStub = {
  belongsTo: sinon.spy(),
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

let StudentStub = {
  belongsTo: sinon.spy(),
  hasMany: sinon.spy()
}

let TutorStub = {
  belongsTo: sinon.spy()
}

let AsignmentStub = {
  belongsTo: sinon.spy()
}

let sandbox = null
// id tutor
let id = 1

let single = Object.assign({}, asignmentFixtures.single)

let newAsignment = {
  title: 'Actividad ' + abc.charAt(getRandomInt(1, 26)),
  deliveryDate: faker.date.future(),
  state: abc.charAt(getRandomInt(1, 4)),
  studentId: 1
}

let idArgs = {
  where: { id }
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  // Model create stub
  AsignmentStub.create = sandbox.stub()
  AsignmentStub.create.withArgs(newAsignment).returns(Promise.resolve({
    toJSON () { return newAsignment }
  }))

  // Model findOne stub
  AsignmentStub.findOne = sandbox.stub()
  AsignmentStub.findOne.withArgs(idArgs).returns(Promise.resolve(asignmentFixtures.byId(id)))

  // Model update stub
  AsignmentStub.update = sandbox.stub()
  AsignmentStub.update.withArgs(single, idArgs).returns(Promise.resolve(single))

  // Model deleteById stub
  AsignmentStub.destroy = sandbox.stub()
  AsignmentStub.destroy.withArgs(idArgs).returns(Promise.resolve(1))

  const setupDatabase = proxyquire('../', {
    './models/student': () => StudentStub,
    './models/user': () => UserStub,
    './models/coordinator': () => CoordinatorStub,
    './models/university': () => UniversityStub,
    './models/boss': () => BossStub,
    './models/place': () => PlaceStub,
    './models/tutor': () => TutorStub,
    './models/asignment': () => AsignmentStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('pass', t => {
  t.pass()
})

test.serial('Asignment#createOrUpdate - new', async t => {
  let asignment = await db.Asignment.createOrUpdate(newAsignment)

  t.true(AsignmentStub.findOne.called, 'findOne should be called on model')
  t.true(AsignmentStub.findOne.calledOnce, 'findOne should be called once')
  t.true(AsignmentStub.findOne.calledWith({
    where: { id: newAsignment.id }
  }), 'findOne should be called with id args')
  t.true(AsignmentStub.create.called, 'create should be called on model')
  t.true(AsignmentStub.create.calledOnce, 'create should be called once')
  t.true(AsignmentStub.create.calledWith(newAsignment), 'create should be called with specified args')

  t.deepEqual(asignment, newAsignment, 'user should be the same')
})

test.serial('Asignment#createOrUpdate - exists', async t => {
  let asignment = await db.Asignment.createOrUpdate(single)

  t.true(AsignmentStub.findOne.called, 'findOne should be called on model')
  t.true(AsignmentStub.findOne.calledTwice, 'findOne should be called once')
  t.true(AsignmentStub.findOne.calledWith({
    where: { id: id }
  }), 'findOne should be called with id student args')
  t.true(AsignmentStub.update.called, 'create should be called on model')
  t.true(AsignmentStub.update.calledOnce, 'update should be called once')
  t.true(AsignmentStub.update.calledWith(single, idArgs), 'update should be called with args single and studentArgs')

  t.deepEqual(asignment, single)
})

test.serial('Asignment#deleteById', async t => {
  let result = await db.Asignment.deleteById(single.id)

  t.true(AsignmentStub.destroy.called, 'deleteById should be called on model')

  t.deepEqual(result, 1)
})
