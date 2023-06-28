process.on('message', (message) => {
    const [jobName, jobInterval] = message.slice(2);
  
    console.log(`Running job ${jobName} every ${jobInterval}`);


    const { workerData } = require("worker_threads");
    console.log(`Hello!, ${workerData.smsTo}`);
    console.log(`you got an SMS from, ${workerData.smsFrom}`);
    console.log(`Message: ${workerData.smsMessage}`);
  
    // Do the job here
  });