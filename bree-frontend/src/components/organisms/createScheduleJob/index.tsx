import { Grid, Icon, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Job } from '../../../pages/jobsDashboard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers';
import TextField from '../../atoms/textField';
import Button from '../../atoms/button';

const sxStyles = {
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '720px',
    bgcolor: 'background.paper'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginLeft: '10px',
    width: '570px'
  },
  closeIcon: {
    cursor: 'pointer'
  }
};

interface JobFormProps {
  onClickCloseIcon: () => void;
  onClickJobCreate: (jobInfo: Job) => void;
}

const CreateScheduleJob = (props: JobFormProps) => {
  const [jobName, setJobName] = useState('');
  const [jobData, setJobData] = useState('');
  const [jobTime, setJobTime] = useState<Dayjs | null>(null);

  const onChangeJobName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobName(event.target.value);
  };

  const onChangeJobData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobData(event.target.value);
  };

  const timeDateFormatChanger = (jobTime: Dayjs) => {
    // Extract date components
    const year = jobTime.year();
    const month = (jobTime.month() + 1).toString().padStart(2, '0'); // Month is zero-indexed
    const day = jobTime.date().toString().padStart(2, '0');
    const hours = jobTime.hour().toString().padStart(2, '0');
    const minutes = jobTime.minute().toString().padStart(2, '0');
    const seconds = jobTime.second().toString().padStart(2, '0');

    // Format the date string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  };

  const onClickJobCreate = () => {
    if (jobName && jobData && jobTime) {
      const job: Job = {
        name: jobName,
        time: timeDateFormatChanger(jobTime),
        data: `{"data":"${jobData}"}`,
        isRecurringJob: false
      };

      props.onClickCloseIcon();
      props.onClickJobCreate(job);
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <Grid sx={sxStyles.modal}>
      <Grid container sx={sxStyles.mainContainer}>
        <Grid
          item
          display={'flex'}
          justifyContent="space-between"
          alignItems="center"
        >
          <h1>Create Schedule Job</h1>
          <Icon
            component={CloseIcon}
            sx={sxStyles.closeIcon}
            onClick={props.onClickCloseIcon}
          />
        </Grid>
        <Grid item>
          <Typography variant="body1">Job Name</Typography>
          <TextField
            value={jobName}
            onChange={onChangeJobName}
            placeholder="Enter job name"
          />
        </Grid>
        <Grid item>
          <Typography variant="body1">Job Time</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField
              value={jobTime}
              onChange={(newValue) => setJobTime(newValue)}
              fullWidth
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <Typography variant="body1">Job Data</Typography>
          <TextField
            value={jobData}
            onChange={onChangeJobData}
            placeholder="Enter job data (JSON format)"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item flexDirection={'row-reverse'}>
          <Button
            variant="contained"
            onClick={onClickJobCreate}
            children={'Create Job'}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateScheduleJob;