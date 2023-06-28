const Sequelize = require('sequelize');
const Servers = require('../model/servers');

const getLeader = async (sequelize) => {
  const Server = Servers(sequelize, Sequelize);
  let registeredServers = await Server.findAll({
    where: {
      serverStatus: true
    },
    order: [[['lastLogin', 'ASC']]]
  });
  registeredServers = registeredServers.map((server) => server.toJSON());
  let leader;
  if (registeredServers.length > 0) {
    leader = registeredServers[0];
    await Server.update(
      {
        isLeader: false
      },
      {
        where: {
          id: {
            [Sequelize.Op.not]: leader.id
          }
        }
      }
    );
    await Server.update(
      {
        isLeader: true
      },
      {
        where: {
          id: leader.id
        }
      }
    );
  }
  return leader;
};

module.exports = getLeader;
