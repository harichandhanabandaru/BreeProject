const dbJobs = require('../model/jobs');
const dbRecurringJobs = require('../model/recurring-jobs');
const serverSpecificBreeJob = require('../model/server-specific-bree-jobs');
const serverSpecificRecurringJob = require('../model/server-specific-recurring-jobs');
const Sequelize = require('sequelize');
const { Op } = require('sequelize'); // Import the Sequelize operators
const updateFailedJobs = async (sequelize, configJobs, retryCount) => {
  const Jobs = dbJobs(sequelize, Sequelize);
  let jobs = await Jobs.findAll({
    where: {
      status: 'failed'
    }
  });
  if (jobs.length > 0) {
    jobs = jobs.map((job) => job.toJSON());
    jobs.forEach(async (job) => {
      if (job.retryCount < retryCount) {
        Jobs.update(
          {
            status: 'pending',
            retryCount: job.retryCount + 1
          },
          {
            where: {
              name: job.name
            }
          }
        );
      }
      if (configJobs.length > 0) {
        configJobs.filter((configJob) => !(configJob.name === job.name));
      }
    });
  }
};

const getAllJobs = async (sequelize) => {
  const Jobs = dbJobs(sequelize, Sequelize);

  let jobs = await Jobs.findAll({});

  jobs = jobs.map((job) => job.toJSON());

  return jobs;
};

const getRecurringJobs = async (sequelize) => {
  const Jobs = dbRecurringJobs(sequelize, Sequelize);

  let jobs = await Jobs.findAll({});

  jobs = jobs.map((job) => job.toJSON());

  return jobs;
};

const getscheduleJobs = async (sequelize) => {
  const Jobs = dbJobs(sequelize, Sequelize);

  let jobs = await Jobs.findAll({
    where: {
      startTime: {
        [Op.ne]: null
      },
      endTime: {
        [Op.ne]: null
      },
      time: {
        [Op.ne]: null
      }
    }
  });

  jobs = jobs.map((job) => job.toJSON());
  return jobs;
};

const getJobsByStatus = async (sequelize, status) => {
  const Jobs = dbJobs(sequelize, Sequelize);

  let jobs = await Jobs.findAll({
    where: {
      status: status
    }
  });

  jobs = jobs.map((job) => job.toJSON());

  return jobs;
};

const getJobsData = async (sequelize, maxJobs, configJobs) => {
  const Jobs = dbJobs(sequelize, Sequelize);
  const RecurringJobs = dbRecurringJobs(sequelize, Sequelize);
  const ServerSpecificBreeJobs = serverSpecificBreeJob(sequelize, Sequelize);
  const ServerSpecificRecurringJobs = serverSpecificRecurringJob(
    sequelize,
    Sequelize
  );
  Jobs.belongsTo(RecurringJobs, {
    foreignKey: 'recurring_jobs_recurring_job_id'
  });

  let serverBreeJobs = await ServerSpecificBreeJobs.findAll();
  let serverRecurringJobs = await ServerSpecificRecurringJobs.findAll();

  serverBreeJobs = serverBreeJobs.map((job) => job.toJSON());
  serverRecurringJobs = serverRecurringJobs.map((job) => job.toJSON());

  const jobIds = serverBreeJobs.map((job) => job.jobId);
  const recurringJobIds = serverRecurringJobs.map((job) => job.recurringJobId);

  let jobs = await Jobs.findAll(
    {
      limit: maxJobs,
      where: {
        [Sequelize.Op.or]: [
          {
            id: { [Sequelize.Op.in]: jobIds },
            status: 'pending',
            isActive: true
          },
          {
            recurringJobId: { [Sequelize.Op.in]: recurringJobIds },
            status: 'pending',
            isActive: true
          }
        ]
      },
      order: [[['time', 'ASC']]]
    },
    {
      include: [RecurringJobs]
    }
  );
  jobs = jobs.map((job) => job.toJSON());
  jobs = jobs.map((job) => {
    const jobTemplate = {
      id: job.id,
      name: job.name,
      worker: {
        workerData: JSON.parse(job.data)
      }
    };
    job.time && (jobTemplate['date'] = job.time);
    configJobs ? configJobs.push(jobTemplate) : '';
    return jobTemplate;
  });
  return jobs;
};

const checkAndDeleteIfExits = async (JobTable, jobName) => {
  let job = await JobTable.findAll({
    where: {
      name: jobName
    }
  });
  if (job.length > 0) {
    job = job[0];
    job = job.toJSON();
    if (job.status == 'pending') {
      return true;
    } else if (job.status == 'completed') {
      JobTable.update(
        { isActive: true },
        {
          where: {
            name: jobName
          }
        }
      );
      return false;
    }
  }
  return false;
};

const addJobsToDB = async (sequelize, createdJob) => {
  const Jobs = dbJobs(sequelize, Sequelize);
  const RecurringJobs = dbRecurringJobs(sequelize, Sequelize);
  const dbJobTable = createdJob.isRecurringJob ? RecurringJobs : Jobs;
  const isAlreadyExits = await checkAndDeleteIfExits(
    dbJobTable,
    createdJob.name
  );
  if (isAlreadyExits) {
    await dbJobTable.update(
      {
        time: createdJob.time,
        data: createdJob.data,
        status: createdJob.status,
        isActive: 'pending'
      },
      { where: { name: createdJob.name } }
    );
  } else {
    await dbJobTable.create({
      name: createdJob.name,
      time: createdJob.time,
      data: createdJob.data,
      status: 'pending',
      isActive: true
    });
  }
  let addedJob = await dbJobTable.findAll({ where: { name: createdJob.name } });
  addedJob = addedJob.map((job) => job.toJSON());
  addedJob = addedJob[0];
  return addedJob;
};

module.exports = {
  getJobsData,
  getJobsByStatus,
  addJobsToDB,
  updateFailedJobs,
  getAllJobs,
  getRecurringJobs,
  getscheduleJobs
};
