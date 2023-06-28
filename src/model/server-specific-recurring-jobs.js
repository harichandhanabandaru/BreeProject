module.exports = (sequelize, Sequelize) => {
  const ServerSpecificRecurringJobs = sequelize.define(
    'server_specific_recurring_jobs',
    {
      serverId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'server_id'
      },
      recurringJobId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'recurring_job_id'
      }
    },
    {
      timestamps: false
    }
  );
  return ServerSpecificRecurringJobs;
};
