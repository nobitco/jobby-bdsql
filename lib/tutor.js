'use strict'

module.exports = function setupTutor (TutorModel) {
  async function createOrUpdate (tutor) {
    const cond = {
      where: {
        id: tutor.id
      }
    }

    const existingTutor = await TutorModel.findOne(cond)

    if (existingTutor) {
      const updated = await TutorModel.update(tutor, cond)
      return updated ? TutorModel.findOne(cond) : existingTutor
    }

    const result = await TutorModel.create(tutor)
    return result.toJSON()
  }

  function findAll () {
    return TutorModel.findAll()
  }

  function deleteById (u) {
    const cond = {
      where: {
        id: u
      }
    }
    return TutorModel.destroy(cond)
  }

  return {
    createOrUpdate,
    findAll,
    deleteById
  }
}
