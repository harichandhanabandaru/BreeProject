const cronParser = require('cron-parser');

const cronConverter = (cronExpression) => {
  const interval = cronParser.parseExpression(cronExpression);
  return interval.next().toDate();
};

module.exports = cronConverter;
