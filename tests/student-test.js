'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const studentFixtures = require('./fixtures/student')

let db = null
let config = {
  logging: function () {}
}
let StudentStub = null
let sandbox = null
let idStudent = 1

let single = Object.assign({}, studentFixtures.single)

let newStudent = {
  id: 1,
  studentCode: '99999',
  identityCard: '99999',
  phone: '311-707323',
  city: 'cali',
  state: 'busqueda',
  university: 1,
  place: 1
}

let studentArgs = {
  where: { idStudent }
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  StudentStub = {
    belongsTo: sandbox.spy()
  }

  // Model create stub
  StudentStub.create = sandbox.stub()
  StudentStub.create.withArgs(newStudent).returns(Promise.resolve({
    toJSON () { return newStudent }
  }))

  // Model findOne stub
  StudentStub.findOne = sandbox.stub()
  StudentStub.findOne.withArgs(studentArgs).returns(Promise.resolve( studentFixtures.single ))
  const setupDatabase = proxyquire('../', {
    './models/student': () => StudentStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('pass', t => {
  t.pass()
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
