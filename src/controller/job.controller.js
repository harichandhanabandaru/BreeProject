const Sequelize = require('sequelize');
const dbJobs = require('../model/jobs');
const db = require('../util/database');
const { dbUrl } = require('../config/config');
const bree = require('../util/initialize-bree');
const sequelize = db.createConnection(dbUrl);
const Jobs = dbJobs(sequelize, Sequelize);
const jobService = require('../service/job-service');


module.exports = {
  async createJob(req, res) {
    try {
      bree.put(req.body);
      res.status(201).send({ message: 'Job created' });
    } catch {
      res.status(500).send({ message: 'Unable to create the job' });
    }
  },

  async createRecurringJobs(req, res) {
    try {
      bree.put(req.body);
      res.status(201).send({ message: 'Job created' });
    } catch {
      res.status(500).send({ message: 'Unable to create the job' });
    }
  },

  async createScheduleJobs(req, res) {
    try {
      bree.put(req.body);
      res.status(201).send({ message: 'Job created' });
    } catch {
      res.status(500).send({ message: 'Unable to create the job' });
    }
  },

  async stopJob(req, res) {
    try {
      const { name } = req.params;
      // bree.stop(name);
      const job = await Jobs.findOne({ where: { name } });

      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      // Update job status to 'pending' to pause the job
      job.status = 'failed';
      await job.save();

      return res.status(200).json({ message: 'Job Stopped successfully' });
    } catch {
      res.status(500).send({ message: 'Unable to stop the job' });
    }
  },

  async pauseJob(req, res) {
    const { name } = req.params;
    const job = await Jobs.findOne({ where: { name } });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Update job status to 'pending' to pause the job
    job.status = 'pending';
    await job.save();

    return res.status(200).json({ message: 'Job paused successfully' });
  },

  async rescheduleJob(req, res) {
    const { name } = req.params;
    const { time } = req.body;

    Jobs.update(
      {
        time
      },
      {
        where: {
          name
        }
      }
    )
      .then(() => {
        res.status(200).send(`Job ${name} updated successfully.`);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error updating job ${name}: ${err}`);
      });
  },

  getAllJobs: async (req, res) => {
    const jobs = await jobService.getAllJobs(sequelize);

    res.status(200).send(jobs);
  },

  getRecurringJobs: async (req, res) => {
    const jobs = await jobService.getRecurringJobs(sequelize);
    res.status(200).send(jobs);
  },
  getscheduleJobs: async (req, res) => {
    const jobs = await jobService.getscheduleJobs(sequelize);

    res.status(200).send(jobs);
  },

  getJobsByStatus: async (req, res) => {
    const jobs = await jobService.getJobsByStatus(sequelize, req.params.status);

    res.status(200).send(jobs);
  },
  async stopJobById(req, res) {
    try {
      const { id } = req.params;
      const job = await Jobs.findOne({ where: { id } });
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      job.status = 'failed';
      await job.save();

      return res.status(200).json({ message: 'Job Stopped successfully' });
    } catch {
      res.status(500).send({ message: 'Unable to stop the job' });
    }
  },

  async pauseJobById(req, res) {
    const { id } = req.params;
    const job = await Jobs.findOne({ where: { id } });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.status = 'pending';
    await job.save();

    return res.status(200).json({ message: 'Job paused successfully' });
  },

  async rescheduleJobById(req, res) {
    const { id } = req.params;
    const { time } = req.body;

    Jobs.update(
      {
        time
      },
      {
        where: {
          id
        }
      }
    )
      .then(() => {
        res.status(200).send(`Job ${id} updated successfully.`);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error updating job ${id}: ${err}`);
      });
  }
};
