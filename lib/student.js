'use strict'

module.exports = function setupStudent (StudentModel) {
  async function createOrUpdate (student) {
    const cond = {
      where: {
        id: student.id
      }
    }

    const existingStudent = await StudentModel.findOne(cond)

    if (existingStudent) {
      const updated = await StudentModel.update(student, cond)
      return updated ? StudentModel.findOne(cond) : existingStudent
    }

    // delete student.id
    
    const result = await StudentModel.create(student)
    return result.toJSON()
  }

  function findAll () {
    return StudentModel.findAll()
  }

  function deleteById (u) {
    const cond = {
      where: {
        id: u
      }
    }
    return StudentModel.destroy(cond)
  }

  return {
    createOrUpdate,
    findAll,
    deleteById
  }
}
