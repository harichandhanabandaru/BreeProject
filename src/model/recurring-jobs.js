module.exports = (sequelize, Sequelize) => {
  const RecurringJobs = sequelize.define(
    'recurring_jobs',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        field: 'recurring_job_id'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'recurring_job_name'
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'recurring_job_time'
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'recurring_job_data'
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
        field: 'recurring_job_status'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        field: 'recurring_job_active'
      }
    },
    {
      timestamps: false
    }
  );
  return RecurringJobs;
};
