const jobStatusState = require("../job-status-state");

class JobStatusContext extends jobStatusState {

    constructor(state) {
      super();
      this.state = state;
    }
  
    setState(state) {
      this.state = state;
    }
  
    async  fetchJobs(sequelize) {
      const jobs = await this.state.fetchJobs(sequelize);
      return jobs;
    }
  
    async  updateJobStatus(sequelize,jobId, jobPayload) {
      const result = await this.state.updateJobStatus(sequelize,jobId, jobPayload);
      return result;
    }
  }

  module.exports = JobStatusContext;