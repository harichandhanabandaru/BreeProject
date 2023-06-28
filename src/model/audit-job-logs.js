const dbJobs = require("./jobs")

module.exports = (sequelize, Sequelize) => {
  const Jobs = dbJobs(sequelize, Sequelize);
    const JobAuditLog = sequelize.define(
      'job_audit_logs',
      {
        AuditId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id"
         },
          jobId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: "job_id"
          },
          status: {
              type: Sequelize.STRING,
              allowNull: false,
              field: "status"
            },
          timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field: "timestamp"
          },
      },{
        timestamps: false,
      }
      
    );
    JobAuditLog.belongsTo(Jobs, {
      foreignKey: 'job_audit_logs_job_id'
    });
    return JobAuditLog;
  };
  
 
  
 