const { workerData } = require("worker_threads");
console.log(`Hello!, ${workerData.name}`);
console.log("Job executed!");