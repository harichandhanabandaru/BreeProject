const Sequelize = require('sequelize');
const Servers = require('../model/servers');

const updateLeader = async (sequelize, server) => {
  const Server = Servers(sequelize, Sequelize);
  await Server.update(
    {
      serverStatus: false,
      lastAciveAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      where: {
        id: server.id
      }
    }
  );
};

module.exports = updateLeader;
