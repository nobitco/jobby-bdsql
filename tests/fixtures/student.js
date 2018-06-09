'use strict'

const faker = require('faker')
var statePractice = ['busqueda', 'proceso', 'culminado']
var universities = ['icesi', 'javeriana', 'usc']
var enterprises = ['Canon', 'Ecopetrol', 'Nobit']
// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const novice = {
  id: 1,
  studentCode: '99999',
  identityCard: '99999',
  phone: '333-33333',
  city: 'Cali',
  state: statePractice[0],
  university: 1,
  place: 1
}

let novices = []
let novicerm = {}

let nTotal = getRandomInt(15, 80)
let idUniversity
let idEnterprise
let idStatePractice

for (let i = 2; i <= nTotal; i++) {
  idUniversity = getRandomInt(0, 3)
  idEnterprise = getRandomInt(0, 3)
  idStatePractice = getRandomInt(0, 3)
  novicerm = {
    id: i - 1,
    studentCode: faker.helpers.userCard(),
    identityCard: faker.helpers.userCard(),
    phone: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: statePractice[0],
    university: 1,
    place: 1
  }
  novices.push(novicerm)
}

module.exports = {
  single: novice,
  all: novices
}
