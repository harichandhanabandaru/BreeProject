const Sequelize = require('sequelize');
const dbJobs = require('../model/jobs');
const db = require('../util/database');
const { dbUrl } = require('../config/config');
const { Op } = require('sequelize'); 

module.exports = {
  async searchJobById(req, res) {
    const sequelize = await db.createConnection(dbUrl);

    const { name } = req.query;

    const Jobs = dbJobs(sequelize, Sequelize);
    Jobs.findAll({
      where: {
      name:{
        [Op.substring]:name
      }
      }
    })
      .then((userResponse) => {
        res.status(200).json(userResponse);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
};
