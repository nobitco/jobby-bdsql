'use strict'

const faker = require('faker')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const university = {
  id: 1,
  name: 'University ' + faker.company.companyName(),
  phone: faker.phone.phoneNumber(),
  address: faker.address.streetAddress(),
  url: faker.internet.url()
}

let universities = []
let universityrm = {}

let nTotal = getRandomInt(3, 5)

universities.push(university)

for (let i = 2; i <= nTotal; i++) {
  universityrm = {
    id: i,
    name: 'University ' + faker.company.companyName(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    url: faker.internet.url()
  }
  universities.push(universityrm)
}

module.exports = {
  single: university,
  all: universities,
  byId: id => universities.filter(a => a.id === id).shift()
}
