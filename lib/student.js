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

    const result = await StudentModel.create(student)
    return result.toJSON()
  }

  function findAll () {
    return StudentModel.findAll()
  }

  return {
    createOrUpdate,
    findAll
  }
}
