module.exports = (sequelize, Sequelize) => {
  const Servers = sequelize.define(
    'servers',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'server_id'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'server_name'
      },
      lastLogin: {
        type: Sequelize.TIME,
        field: 'last_login'
      },
      lastAciveAt: {
        type: Sequelize.DATE,
        field: 'last_active_at'
      },
      serverStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'server_status'
      },
      isLeader: {
        type: Sequelize.BOOLEAN,
        field: 'leader'
      }
    },
    {
      timestamps: false
    }
  );
  return Servers;
};
