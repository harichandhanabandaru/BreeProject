const dbJobs = require('../model/jobs')
const Sequelize = require('sequelize')
const JobStatusState = require('../job-status-state')

class FetchJobStatus extends JobStatusState {
    async  fetchJobs(sequelize) {
      const Jobs = dbJobs(sequelize, Sequelize);
      const jobs =await Jobs.findAll({
        where: {
          status : 'pending'
      }
      });
      return jobs;
    }
  
    async  updateJobStatus(sequelize,jobId, jobStatus) {
      throw new Error('Cannot update job status before fetching jobs.');
    }
  }

  module.exports = FetchJobStatus;