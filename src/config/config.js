module.exports = {
  dbUrl: process.env.dbUrl || 'mysql://root:root@127.0.0.1:3306/bree',
  port: process.env.PORT || 9091  ,
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:9091'
};
