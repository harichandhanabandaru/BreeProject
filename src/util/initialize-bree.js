const Bree = require('../index');

const bree = new Bree({
  mysqlDatabase: {
    driverUrl: 'mysql://root:Bhav_6421!@127.0.0.1:3306/bree',
    jobInterval: 10000,
    maxJobs: 2,
    port: 5000
  }
});

module.exports = bree;