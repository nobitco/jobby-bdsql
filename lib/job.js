'use strict'

module.exports = function setupJob (JobModel) {
  async function createOrUpdate (job) {
    const cond = {
      where: {
        id: job.idPlace
      }
    }

    const existingJob = await JobModel.findOne(cond)

    if (existingJob) {
      const updated = await JobModel.update(job, cond)
      return updated ? JobModel.findOne(cond) : existingJob
    }

    const result = await JobModel.create(job)

    return result.toJSON()
  }

  function findAll () {
    return JobModel.findAll()
  }

  function deleteById (u) {
    const cond = {
      where: {
        id: u
      }
    }
    return JobModel.destroy(cond)
  }

  return {
    findAll,
    createOrUpdate,
    deleteById
  }
}
