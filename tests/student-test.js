'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const studentFixtures = require('./fixtures/student')

let db = null
let config = {
  logging: function () {}
}

let StudentStub = {
  belongsTo: sinon.spy()
}

let CoordinatorStub = {
  belongsTo: sinon.spy()
}

let UserStub = null
let sandbox = null
// id student
let id = 1

let single = Object.assign({}, studentFixtures.single)

let newStudent = {
  id: 9999,
  phone: '333-333333',
  city: 'cali',
  state: 'busqueda',
  userId: 1,
  placeId: 1,
  bossId: 1,
  coordinatorId: 1,
  universityId: 1
}

let studentArgs = {
  where: { id }
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  // Model create stub
  StudentStub.create = sandbox.stub()
  StudentStub.create.withArgs(newStudent).returns(Promise.resolve({
    toJSON () { return newStudent }
  }))

  // Model findOne stub
  StudentStub.findOne = sandbox.stub()
  StudentStub.findOne.withArgs(studentArgs).returns(Promise.resolve(studentFixtures.byId(id)))

  // Model update stub
  StudentStub.update = sandbox.stub()
  StudentStub.update.withArgs(single, studentArgs).returns(Promise.resolve(single))

  // Model deleteById stub
  StudentStub.destroy = sandbox.stub()
  StudentStub.destroy.withArgs(studentArgs).returns(Promise.resolve(1))

  const setupDatabase = proxyquire('../', {
    './models/student': () => StudentStub,
    './models/user': () => UserStub,
    './models/coordinator': () => CoordinatorStub
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
  t.true(StudentStub.belongsTo.called, 'StudentModel.belongsTo was executed')
  t.true(StudentStub.belongsTo.calledWith(UserStub), 'Argument should be the AgentModel')
})

test.serial('Student#createOrUpdate - new', async t => {
  let student = await db.Student.createOrUpdate(newStudent)

  t.true(StudentStub.findOne.called, 'findOne should be called on model')
  t.true(StudentStub.findOne.calledOnce, 'findOne should be called once')
  t.true(StudentStub.findOne.calledWith({
    where: { id: newStudent.id }
  }), 'findOne should be called with username args')
  t.true(StudentStub.create.called, 'create should be called on model')
  t.true(StudentStub.create.calledOnce, 'create should be called once')
  t.true(StudentStub.create.calledWith(newStudent), 'create should be called with specified args')

  t.deepEqual(student, newStudent, 'user should be the same')
})

test.serial('Student#createOrUpdate - exists', async t => {
  let student = await db.Student.createOrUpdate(single)

  t.true(StudentStub.findOne.called, 'findOne should be called on model')
  t.true(StudentStub.findOne.calledTwice, 'findOne should be called once')
  t.true(StudentStub.findOne.calledWith({
    where: { id: id }
  }), 'findOne should be called with id student args')
  t.true(StudentStub.update.called, 'create should be called on model')
  t.true(StudentStub.update.calledOnce, 'update should be called once')
  t.true(StudentStub.update.calledWith(single, studentArgs), 'update should be called with args single and studentArgs')

  t.deepEqual(student, single)
})

test.serial('Student#deleteById', async t => {
  let result = await db.Student.deleteById(single.id)

  t.true(StudentStub.destroy.called, 'deleteById should be called on model')

  t.deepEqual(result, 1)
})
