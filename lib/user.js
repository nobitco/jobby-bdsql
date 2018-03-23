'use strict'

module.exports = function setupUser (UserModel) {
  async function createOrUpdate (user) {
    const cond = {
      where: {
        username: user.username
      }
    }

    const existingUser = await UserModel.findOne(cond)

    if (existingUser) {
      const updated = await UserModel.update(user, cond)
      return updated ? UserModel.findOne(cond) : existingUser
    }

    const result = await UserModel.create(user)
    return result.toJSON()
  }

  function findByUsername (username) {
    return UserModel.findOne({
      where: {
        username
      }
    })
  }

  function findAll () {
    return UserModel.findAll()
  }

  function deleteByUsername (u) {
    const cond = {
      where: {
        username: u
      }
    }
    return UserModel.destroy(cond)
  }

  return {
    createOrUpdate,
    findByUsername,
    findAll,
    deleteByUsername
  }
}
