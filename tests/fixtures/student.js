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

const student = {
  id: 1,
  phone: faker.phone.phoneNumber(),
  city: faker.address.city(),
  state: statePractice[0],
  userId: 1,
  placeId: 1,
  bossId: 1,
  coordinatorId: 1,
  universityId: 1
}

let students = []
let studentrm = {}

let nTotal = getRandomInt(15, 80)
let idUniversity
let idEnterprise
let idStatePractice

students.push(student)

for (let i = 2; i <= nTotal; i++) {
  idUniversity = getRandomInt(0, 3)
  idEnterprise = getRandomInt(0, 3)
  idStatePractice = getRandomInt(0, 3)
  studentrm = {
    id: i,
    phone: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: statePractice[idStatePractice],
    userId: i,
    placeId: idEnterprise,
    bossId: 1,
    coordinatorId: 1,
    universityId: idUniversity
  }
  students.push(studentrm)
}

module.exports = {
  single: student,
  all: students,
  byId: id => students.filter(a => a.id === id).shift()
}
