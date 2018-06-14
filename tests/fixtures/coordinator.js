'use strict'

const faker = require('faker')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const coordinator = {
  id: 1,
  phone: faker.phone.phoneNumber(),
  address: faker.address.streetAddress(),
  userId: 1,
  universityId: 1
}

let coordinators = []
let coordinatorrm = {}

let nTotal = getRandomInt(3, 5)

coordinators.push(coordinator)

for (let i = 2; i <= nTotal; i++) {
  coordinatorrm = {
    id: i,
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    userId: i,
    universityId: getRandomInt(1, 3)
  }
  coordinators.push(coordinatorrm)
}

module.exports = {
  single: coordinator,
  all: coordinators,
  byId: id => coordinators.filter(a => a.id === id).shift()
}
