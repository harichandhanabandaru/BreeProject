import axios from 'axios';

const apiUrl = "http://localhost:9091"

export class JobService {
  static async getJobs() {
    const response = await axios.get(`${apiUrl}/api/jobs`);
    return response.data;
  }
  static async getRecurringJobs() {
    const response = await axios.get(`${apiUrl}/api/recurringJobs`);
    return response.data;
  }

  static async getScheduleJobs() {
    const response = await axios.get(`${apiUrl}/api/scheduleJobs`);
    return response.data;
  }

  static async getJobsByStatus(status: string) {
    const response = await axios.get(
      `${apiUrl}/api/jobs/` + status
    );
    return response.data;
  }

  static async createJobs(job: any) {
    axios
      .post(`${apiUrl}/createJob/`, job)
      .then((response) => {
        console.log(' response  ', response);
        alert(' new job created');
        return response;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  static async createScheduleJobs(job: any) {
    axios
      .post(`${apiUrl}/createScheduleJobs/`, job)
      .then((response) => {
        console.log(' response  ', response);
        alert(' new job created');
        return response;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  static async createRecurringJobs(job: any) {
    axios
      .post(`${apiUrl}/createRecurringJobs/`, job)
      .then((response) => {
        console.log(' response  ', response);
        alert(' new job created');
        return response;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  static async searchJobs(jobName: string) {
    const response = await axios.put(
      `${apiUrl}/searchJobs?name=` + jobName
    );
    return response.data;
  }

  static async stopJobId(id: string) {
    const response = await axios.put(`${apiUrl}/api/stopJobById/` + id);
    return response.data;
  }

  static async pauseJobId(id: string) {
    const response = await axios.put(
      `${apiUrl}/api/pauseJobById/` + id
    );
    return response.data;
  }

  static async resheduleJobId(id: string, time: any) {
    const response = await axios.put(
      `${apiUrl}/rescheduleJobById/` + id,
      time
    );
    return response.data;
  }
}