const Sequelize = require('sequelize');
const cronConverter = require('../util/cron-to-time');
const dbRecurringJobs = require('../model/recurring-jobs');
const dbJobs = require('../model/jobs');

const getRecurringJobsData = async (sequelize) => {
  const Jobs = dbJobs(sequelize, Sequelize);
  const RecurringJobs = dbRecurringJobs(sequelize, Sequelize);
  let recurringJobs = await RecurringJobs.findAll({
    where: { status: 'pending', isActive: true }
  });
  recurringJobs = recurringJobs.map((recurringJob) => recurringJob.toJSON());

  recurringJobs.map(async (recurringJob) => {
    let getAllJobs = await Jobs.findAll({
      where: Sequelize.and(
        { name: recurringJob.name },
        Sequelize.or({ status: 'skipped' }, { status: 'pending' })
      )
    });
    if (getAllJobs.length === 0) {
      await Jobs.create({
        name: recurringJob.name,
        time: cronConverter(recurringJob.time),
        data: recurringJob.data,
        status: 'pending',
        isActive: true,
        recurringJobId: recurringJob.id
      });
    } else {
      await Jobs.update(
        {
          time: cronConverter(recurringJob.time),
          isActive: recurringJob.isActive,
          recurringJobId: recurringJob.id
        },
        { where: { name: recurringJob.name, status: 'pending' } }
      );
    }
  });
};
module.exports = getRecurringJobsData;
