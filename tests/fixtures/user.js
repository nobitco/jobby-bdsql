'use strict'

const user = {
  id: 1,
  username: 'jamarquez',
  password: 'secret'
}

const users = [
  user,
  extend(user, { id: 2, username: 'davmarquez', password: 'secret' }),
  extend(user, { id: 3, username: 'clamarquez', password: 'secret' }),
  extend(user, { id: 4, username: 'mfmarquez', password: 'secret' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)

  return Object.assign(clone, values)
}
module.exports = {
  single: user,
  all: users,
  byUsername: username => users.filter(a => a.username === username).shift()
}
