'use strict'

module.exports = function setupAsignment (AsignmentModel) {
  async function createOrUpdate (asignment) {
    const cond = {
      where: {
        id: asignment.id
      }
    }

    const existingAsignment = await AsignmentModel.findOne(cond)

    if (existingAsignment) {
      const updated = await AsignmentModel.update(asignment, cond)
      return updated ? AsignmentModel.findOne(cond) : existingAsignment
    }

    const result = await AsignmentModel.create(asignment)
    return result.toJSON()
  }

  function findAll () {
    return AsignmentModel.findAll()
  }

  function deleteById (u) {
    const cond = {
      where: {
        id: u
      }
    }
    return AsignmentModel.destroy(cond)
  }

  return {
    createOrUpdate,
    findAll,
    deleteById
  }
}
