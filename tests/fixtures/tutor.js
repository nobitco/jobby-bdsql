'use strict'
// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const tutor = {
  id: 1,
  coordinatorId: 1,
  universityId: 1,
  userId: 1
}

let tutors = []
let tutorrm = {}

let nTotal = getRandomInt(15, 80)
let idUniversity

tutors.push(tutor)

for (let i = 2; i <= nTotal; i++) {
  idUniversity = getRandomInt(1, 4)

  tutorrm = {
    id: i,
    coordinatorId: 1,
    universityId: idUniversity,
    userId: 1
  }
  tutors.push(tutorrm)
}

module.exports = {
  single: tutor,
  all: tutors,
  byId: id => tutors.filter(a => a.id === id).shift()
}
