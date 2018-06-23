'use strict'

module.exports = function setupBoss (BossModel) {
  async function createOrUpdate (boss) {
    const cond = {
      where: {
        userId: boss.userId
      }
    }

    const existingBoss = await BossModel.findOne(cond)

    if (existingBoss) {
      const updated = await BossModel.update(boss, cond)

      return updated ? BossModel.findOne(cond) : existingBoss
    }

    const result = await BossModel.create(boss)
    return result.toJSON()
  }

  function findAll () {
    return BossModel.findAll()
  }

  function deleteByUserId (userId) {
    const cond = {
      where: {
        userId: userId
      }
    }

    return BossModel.destroy(cond)
  }

  return {
    findAll,
    createOrUpdate,
    deleteByUserId
  }
}
