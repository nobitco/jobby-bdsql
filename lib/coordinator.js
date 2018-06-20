'use strict'

module.exports = function setupCoordinator (CoordinatorModel) {
  async function createOrUpdate (coordinator) {
    const cond = {
      where: {
        id: coordinator.id
      }
    }

    const existingCoordinator = await CoordinatorModel.findOne(cond)

    if (existingCoordinator) {
      const updated = await CoordinatorModel.update(coordinator, cond)
      return updated ? CoordinatorModel.findOne(cond) : existingCoordinator
    }

    delete coordinator.id
    
    const result = await CoordinatorModel.create(coordinator)
    return result.toJSON()
  }

  function findAll () {
    return CoordinatorModel.findAll()
  }

  function deleteById (u) {
    const cond = {
      where: {
        id: u
      }
    }
    return CoordinatorModel.destroy(cond)
  }

  return {
    createOrUpdate,
    findAll,
    deleteById
  }
}
