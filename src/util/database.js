const Sequelize = require('sequelize');


const createConnection = (url) => {
    const sequelize = new Sequelize(url,{timezone: '+05:30' });
    return sequelize;
}

exports.createConnection = createConnection;
