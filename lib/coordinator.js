'use strict'

module.exports = function setupCoordinator (CoordinatorModel) {
  async function createOrUpdate (coordinator) {
    const cond = {
      where: {
        userId: coordinator.userId
      }
    }

    const existingCoordinator = await CoordinatorModel.findOne(cond)

    if (existingCoordinator) {
      const updated = await CoordinatorModel.update(coordinator, cond)
      return updated ? CoordinatorModel.findOne(cond) : existingCoordinator
    }

    const result = await CoordinatorModel.create(coordinator)
    return result.toJSON()
  }

  function findAll () {
    return CoordinatorModel.findAll()
  }

  function deleteByUserId (u) {
    const cond = {
      where: {
        userId: u
      }
    }
    return CoordinatorModel.destroy(cond)
  }

  return {
    createOrUpdate,
    findAll,
    deleteByUserId
  }
}
