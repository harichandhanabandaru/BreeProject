const dbJobs = require('./model/jobs');
const dbRecurringJobs = require('./model/recurring-jobs');
const Sequelize = require('sequelize');

const getJobsData = async (sequelize, maxJobs, jobInterval = 10000) => {
  const Jobs = dbJobs(sequelize, Sequelize);
  const RecurringJobs = dbRecurringJobs(sequelize, Sequelize);

  Jobs.belongsTo(RecurringJobs, {
    foreignKey: 'recurring_jobs_recurring_job_id'
  });

  let offset = 0;
  var jobs = [];

  jobs = await Jobs.findAll({
    offset,
    limit: maxJobs
  });
  jobs = jobs.map((e) => e.toJSON());

  return jobs;
};

module.exports = getJobsData;
