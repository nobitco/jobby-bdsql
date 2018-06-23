'use strict'

module.exports = function setupUniversity (UniversityModel) {
  async function createOrUpdate (university) {
    const cond = {
      where: {
        id: university.id
      }
    }

    const existingUniversity = await UniversityModel.findOne(cond)
    
    if (existingUniversity) {
      const updated = await UniversityModel.update(university, cond)
      return updated ? UniversityModel.findOne(cond) : existingUniversity
    }
    
    // delete university.id
    const result = await UniversityModel.create(university)

    return result.toJSON()
  }

  function findAll () {
    return UniversityModel.findAll()
  }

  function deleteById (u) {
    const cond = {
      where: {
        id: u
      }
    }
    return UniversityModel.destroy(cond)
  }

  return {
    findAll,
    createOrUpdate,
    deleteById
  }
}
