'use strict'

module.exports = function setupPlace (PlaceModel) {
  async function createOrUpdate (place) {
    const cond = {
      where: {
        userId: place.userId
      }
    }

    const existingPlace = await PlaceModel.findOne(cond)

    if (existingPlace) {
      const updated = await PlaceModel.update(place, cond)

      return updated ? PlaceModel.findOne(cond) : existingPlace
    }

    const result = await PlaceModel.create(place)
    return result.toJSON()
  }

  function findAll () {
    return PlaceModel.findAll()
  }

  function deleteByUserId (userId) {
    const cond = {
      where: {
        userId: userId
      }
    }

    return PlaceModel.destroy(cond)
  }

  return {
    findAll,
    createOrUpdate,
    deleteByUserId
  }
}
