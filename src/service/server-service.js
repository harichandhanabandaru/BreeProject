const Sequelize = require('sequelize');
const Servers = require('../model/servers');
const express = require("express");
const app = express();

const ServerService = async (sequelize, serverName) => {
  const Server = Servers(sequelize, Sequelize);
  const serverPort = serverName.split('@')[1];
  let res = await Server.findAll({
    where: {
      name: serverName
    }
  });
  res = res.map((server) => server.toJSON());
  if (res.length === 0) {
    await Server.create({
      name: serverName,
      lastLogin: Sequelize.literal('CURRENT_TIMESTAMP'),
      serverStatus: true
    });
  } else {
    await Server.update(
      {
        lastLogin: Sequelize.literal('CURRENT_TIMESTAMP'),
        serverStatus: true
      },
      {
        where: {
          name: serverName
        }
      }
    );
  }
  app.get('/heartbeat', (req, result) => {
    result.status(200).send('Application is running');
  });
  app.listen(serverPort, () => console.log(`listening on port ${serverPort}`));
  return await res[0];
};

module.exports = ServerService;
