const jobsController = require('../controller/job.controller');
const router = require('express').Router();

router.get('/jobs', jobsController.getAllJobs);
router.get('/jobs/:status', jobsController.getJobsByStatus);
router.put('/rescheduleJobById/:id', jobsController.rescheduleJobById);
router.put('/pauseJobById/:id', jobsController.pauseJobById);
router.put('/stopJobById/:id', jobsController.stopJobById);
router.get('/recurringJobs', jobsController.getRecurringJobs);
router.get('/scheduleJobs', jobsController.getscheduleJobs);

module.exports = router;
