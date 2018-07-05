'use strict'

const faker = require('faker')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

let today = Date.now()

const job = {
  id: 1,
  title: faker.name.jobTitle(),
  description: faker.name.jobDescriptor(),
  type: faker.name.jobType(),
  city: faker.address.city(),
  state: faker.random.boolean(),
  postTime: today.toString(),
  placeId: 1
}

let jobs = []
let jobrm = {}

let nTotal = getRandomInt(3, 5)

jobs.push(job)

for (let i = 2; i <= nTotal; i++) {
  jobrm = {
    id: i,
    title: faker.name.jobTitle(),
    type: faker.name.jobType(),
    city: faker.address.city(),
    state: faker.random.boolean(),
    postTime: today.toString(),
    placeId: i
  }
  jobs.push(jobrm)
}

module.exports = {
  single: job,
  all: jobs,
  byId: id => jobs.filter(a => a.id === id).shift(),
  byPlaceId: placeId => jobs.filter(a => a.placeId === placeId).shift()
}
