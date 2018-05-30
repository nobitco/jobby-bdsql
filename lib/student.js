'use strict'

module.exports = function setupStudent (StudentModel) {
  function findAll () {
    return StudentModel.findAll()
  }

  return {
    findAll
  }
}
