'use strict'

module.exports = function setupBoss (BossModel) {
  function findAll () {
    return BossModel.findAll()
  }

  return {
    findAll
  }
}
