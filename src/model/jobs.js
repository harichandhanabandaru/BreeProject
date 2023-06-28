module.exports = (sequelize, Sequelize) => {
  const Jobs = sequelize.define(
    'bree_jobs',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'job_id'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'job_name'
      },
      time: {
        type: Sequelize.TIME,
        field: 'job_time'
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'job_data'
      },
      status: {
        type: Sequelize.ENUM(
          'pending',
          'running',
          'completed',
          'failed',
          'skipped'
        ),
        allowNull: false,
        field: 'job_status'
      },
      startTime: {
        type: Sequelize.TIME,
        field: 'job_start_time'
      },
      endTime: {
        type: Sequelize.TIME,
        field: 'job_end_time'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        field: 'job_active'
      },
      recurringJobId: {
        type: Sequelize.INTEGER,
        field: 'recurring_jobs_recurring_job_id'
      },
      retryCount: {
        type: Sequelize.TIME,
        field: "job_retry_count"
      },
    },
    {
      timestamps: false
    }
  );
  return Jobs;
};
