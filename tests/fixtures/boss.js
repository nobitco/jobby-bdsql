'use strict'

const faker = require('faker')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const boss = {
  phone: faker.phone.phoneNumber(),
  userId: 1
}

let bosses = []
let bossrm = {}

let nTotal = getRandomInt(3, 5)

bosses.push(boss)

for (let i = 2; i <= nTotal; i++) {
  bossrm = {
    id: i,
    phone: faker.phone.phoneNumber(),
    userId: i
  }
  bosses.push(bossrm)
}

module.exports = {
  single: boss,
  all: bosses,
  byId: id => bosses.filter(a => a.id === id).shift(),
  byUserId: userId => bosses.filter(a => a.userId === userId).shift()
}
