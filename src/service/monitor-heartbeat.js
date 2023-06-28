const http = require('http');
const Servers = require('../model/servers');
const Sequelize = require('sequelize');
const updateLeader = require('../service/update-leader');
const express = require("express");
const app = express();

const monitorServer = async (sequelize) => {
  const Server = Servers(sequelize, Sequelize);
  let res = await Server.findAll({
    where: {
      serverStatus: true
    }
  });
  res = res.map((server) => server.toJSON());
  res.map((serverItem) => {
    const serverPort = serverItem.name.split('@')[1];
    const serverUrl = `http://localhost:${serverPort}/heartbeat`;
    const request = http.get(serverUrl, async (res) => {
      const { statusCode } = res;
      if (statusCode !== 200) {
        console.log(`${serverItem.name} is down`);
      } else {
        console.log(`${serverItem.name} is up and running! `);
      }
    });
    request.on('error', (error) => {
      updateLeader(sequelize, serverItem);
      request.destroy();
    });
  });
};

module.exports = monitorServer;
