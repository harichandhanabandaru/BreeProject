const Sequelize = require('sequelize');
const Servers = require('../model/servers');

const getServers = async (sequelize, serverName) => {
  const Server = Servers(sequelize, Sequelize);
  let registeredServers = await Server.findAll({ where: { name: serverName } });
  if (registeredServers.length !== 0) return registeredServers[0].toJSON();
};

module.exports = getServers;
