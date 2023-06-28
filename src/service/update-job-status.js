
const dbJobs = require('../model/jobs')
const Sequelize = require('sequelize')
const JobStatusState = require('../job-status-state')
const dbJobAuditLog = require('../model/audit-job-logs')


class UpdateJobStatus extends JobStatusState {
   async fetchJobs(){
     throw new Error('Need not fetch jobs once they are already fetched.');
   }
    async updateJobStatus(sequelize,jobId, payload) {
     const Jobs = dbJobs(sequelize, Sequelize);
     const JobAuditLog = dbJobAuditLog(sequelize, Sequelize);
     const result = await Jobs.update( payload, { where: { id: jobId }} );
     await JobAuditLog.create({
       jobId: jobId,
       status: payload.status,
     }).then((res)=>{
      console.log("new history made!",res)
     }
      
     ).catch(()=>{
      console.log("error creating log");
     }
     )
     return result;
   }
 }



  module.exports = UpdateJobStatus;