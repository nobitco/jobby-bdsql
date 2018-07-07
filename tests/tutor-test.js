'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const tutorFixtures = require('./fixtures/tutor')

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
  belongsTo: sinon.spy(),
}

let sandbox = null
// id tutor
let id = 1

let single = Object.assign({}, tutorFixtures.single)

let newTutor = {
  coordinatorId: 1,
  universityId: 1,
  userId: 1
}

let idArgs = {
  where: { id }
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  // Model create stub
  TutorStub.create = sandbox.stub()
  TutorStub.create.withArgs(newTutor).returns(Promise.resolve({
    toJSON () { return newTutor }
  }))

  // Model findOne stub
  TutorStub.findOne = sandbox.stub()
  TutorStub.findOne.withArgs(idArgs).returns(Promise.resolve(tutorFixtures.byId(id)))

  // Model update stub
  TutorStub.update = sandbox.stub()
  TutorStub.update.withArgs(single, idArgs).returns(Promise.resolve(single))

  // Model deleteById stub
  TutorStub.destroy = sandbox.stub()
  TutorStub.destroy.withArgs(idArgs).returns(Promise.resolve(1))

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

test.serial('Setup', t => {
  t.true(TutorStub.belongsTo.called, 'StudentModel.belongsTo was executed')
  t.true(TutorStub.belongsTo.calledWith(UserStub), 'Argument should be the AgentModel')
})

test.serial('Tutor#createOrUpdate - new', async t => {
  let tutor = await db.Tutor.createOrUpdate(newTutor)

  t.true(TutorStub.findOne.called, 'findOne should be called on model')
  t.true(TutorStub.findOne.calledOnce, 'findOne should be called once')
  t.true(TutorStub.findOne.calledWith({
    where: { id: newTutor.id }
  }), 'findOne should be called with id args')
  t.true(TutorStub.create.called, 'create should be called on model')
  t.true(TutorStub.create.calledOnce, 'create should be called once')
  t.true(TutorStub.create.calledWith(newTutor), 'create should be called with specified args')

  t.deepEqual(tutor, newTutor, 'user should be the same')
})

test.serial('Tutor#createOrUpdate - exists', async t => {
  let tutor = await db.Tutor.createOrUpdate(single)

  t.true(TutorStub.findOne.called, 'findOne should be called on model')
  t.true(TutorStub.findOne.calledTwice, 'findOne should be called once')
  t.true(TutorStub.findOne.calledWith({
    where: { id: id }
  }), 'findOne should be called with id student args')
  t.true(TutorStub.update.called, 'create should be called on model')
  t.true(TutorStub.update.calledOnce, 'update should be called once')
  t.true(TutorStub.update.calledWith(single, idArgs), 'update should be called with args single and studentArgs')

  t.deepEqual(tutor, single)
})

test.serial('Tutor#deleteById', async t => {
  let result = await db.Tutor.deleteById(single.id)

  t.true(TutorStub.destroy.called, 'deleteById should be called on model')

  t.deepEqual(result, 1)
})
