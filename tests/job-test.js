'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const jobFixtures = require('./fixtures/job')
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

let JobStub = null

// user id coordinator
let placeId = 1

let jobId = 1

let id = 1

let single = Object.assign({}, jobFixtures.single)

let today = Date.now()

let newJob = {
  title: faker.name.jobTitle(),
  description: faker.name.jobDescriptor(),
  type: faker.name.jobType(),
  city: faker.address.city(),
  state: faker.random.boolean(),
  postTime: today.toString(),
  placeId: 9998
}

let placeidArgs = {
  where: { placeId }
}

let jobIdArgs = {
  where: { id }
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  JobStub = {
    hasMany: sandbox.spy()
  }

  // Model create stub
  JobStub.create = sandbox.stub()
  JobStub.create.withArgs(newJob).returns(Promise.resolve({
    toJSON () { return newJob }
  }))

  // Model findOne stub
  JobStub.findOne = sandbox.stub()
  JobStub.findOne.withArgs(jobIdArgs).returns(Promise.resolve(jobFixtures.byId(jobId)))

  // Model update stub
  JobStub.update = sandbox.stub()
  JobStub.update.withArgs(single, jobIdArgs).returns(Promise.resolve(single))

  // Model deleteById stub
  JobStub.destroy = sandbox.stub()
  JobStub.destroy.withArgs(jobIdArgs).returns(Promise.resolve(1))

  const setupDatabase = proxyquire('../', {
    './models/student': () => StudentStub,
    './models/user': () => UserStub,
    './models/coordinator': () => CoordinatorStub,
    './models/university': () => UniversityStub,
    './models/boss': () => BossStub,
    './models/place': () => PlaceStub,
    './models/job': () => JobStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('pass', t => {
  t.pass()
})

test.serial('Job#createOrUpdate - new', async t => {
  let job = await db.Job.createOrUpdate(newJob)

  t.true(JobStub.findOne.called, 'findOne should be called on model')
  t.true(JobStub.findOne.calledOnce, 'findOne should be called once')
  t.true(JobStub.findOne.calledWith({
    where: { id: undefined }
  }), 'findOne should be called with placeidArgs')
  t.true(JobStub.create.called, 'create should be called on model')
  t.true(JobStub.create.calledOnce, 'create should be called once')
  t.true(JobStub.create.calledWith(newJob), 'create should be called with specified args')

  t.deepEqual(job, newJob, 'job should be the same')
})

test.serial('Job#createOrUpdate - exists', async t => {
  let job = await db.Job.createOrUpdate(single)

  t.true(JobStub.findOne.called, 'findOne should be called on model')
  t.true(JobStub.findOne.calledTwice, 'findOne should be called once')
  t.true(JobStub.findOne.calledWith({
    where: { id: single.id }
  }), 'findOne should be called with id student args')
  t.true(JobStub.update.called, 'create should be called on model')
  t.true(JobStub.update.calledOnce, 'update should be called once')
  t.true(JobStub.update.calledWith(single, jobIdArgs), 'update should be called with args single and studentArgs')

  t.deepEqual(job, single)
})

test.serial('Job#deleteById', async t => {
  let result = await db.Job.deleteById(single.id)

  t.true(JobStub.destroy.called, 'deleteById should be called on model')
  t.true(JobStub.destroy.calledWith({
    where: { id: single.id }
  }), 'findOne should be called with id student args')
  t.deepEqual(result, 1)
})
