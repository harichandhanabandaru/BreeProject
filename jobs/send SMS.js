

const { workerData } = require("worker_threads");
console.log(`Hello!, ${workerData.smsTo}`);
console.log(`you got an SMS from, ${workerData.smsFrom}`);
console.log(`Message: ${workerData.smsMessage}`);
setTimeout(function () {
    console.log("10 seconds timeout");
  }, 10000);