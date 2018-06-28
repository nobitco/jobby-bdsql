'use strict'

const faker = require('faker')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const place = {
  id: 1,
  name: faker.company.companyName(),
  phone: faker.phone.phoneNumber(),
  city: faker.address.city(),
  country: faker.address.country(),
  address: faker.address.streetAddress(),
  avatar: faker.internet.avatar(),
  userId: 1
}

let places = []
let placerm = {}

let nTotal = getRandomInt(3, 5)

places.push(place)

for (let i = 2; i <= nTotal; i++) {
  placerm = {
    id: i,
    name: faker.company.companyName(),
    phone: faker.phone.phoneNumber(),
    city: faker.address.city(),
    country: faker.address.country(),
    address: faker.address.streetAddress(),
    avatar: faker.internet.avatar(),
    userId: i
  }
  places.push(placerm)
}

module.exports = {
  single: place,
  all: places,
  byId: id => places.filter(a => a.id === id).shift(),
  byUserId: userId => places.filter(a => a.userId === userId).shift()
}
