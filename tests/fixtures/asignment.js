'use strict'

const faker = require('faker')

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
var abc = 'ABCDEFGHIJKLMNÑOPQRSTUWXYZ'

const asignment = {
  id: 1,
  title: 'Actividad ' + abc.charAt(getRandomInt(1, 26)),
  deliveryDate: faker.date.future(),
  state: abc.charAt(getRandomInt(1, 4)),
  studentId: 1
}

let asignments = []
let asignmentrm = {}
let studentId
let nTotal = getRandomInt(5, 10)

asignments.push(asignment)

for (let i = 2; i <= nTotal; i++) {
  studentId = getRandomInt(1, 4)

  asignmentrm = {
    id: i,
    title: 'Actividad ' + abc.charAt(getRandomInt(1, 26)),
    deliveryDate: faker.date.future(),
    state: abc.charAt(getRandomInt(1, 4)),
    studentId: studentId
  }
  asignments.push(asignmentrm)
}

module.exports = {
  single: asignment,
  all: asignments,
  byId: id => asignments.filter(a => a.id === id).shift()
}
