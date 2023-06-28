module.exports = (sequelize, Sequelize) => {
  const ServerSpecificBreeJobs = sequelize.define(
    'server_specific_bree_jobs',
    {
      serverId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'server_id'
      },
      jobId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'job_id'
      }
    },
    {
      timestamps: false
    }
  );
  return ServerSpecificBreeJobs;
};
