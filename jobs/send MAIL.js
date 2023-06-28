const { workerData } = require("worker_threads");
console.log(`Hello!, ${workerData.emailTo}`);
console.log(`you got an E-MAIL from, ${workerData.emailFrom}`);
console.log(`Message: ${workerData.emailMessage}`);