const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const Bree = require('../index');
const { frontend_url, port } = require('../config/config');
const { searchJobById } = require('../controller/search.controller');
const bree = require('../util/initialize-bree');
const {
  createJob,
  rescheduleJob,
  pauseJob,
  stopJob,
  createRecurringJobs,
  createScheduleJobs
} = require('../controller/job.controller');

const app = express();

bree.start();

const routes = require('../routes/jobs-router');

const corsOptions = {
  origin: frontend_url
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api', routes);

app.get('/searchJobs', searchJobById);
app.put('/rescheduleJob/:name', rescheduleJob);
app.get('/pauseJob/:name', pauseJob);
app.get('/stopJob/:name', stopJob);
app.post('/createJob', createJob);
app.post('/createRecurringJobs', createRecurringJobs);
app.post('/createScheduleJobs', createScheduleJobs);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
