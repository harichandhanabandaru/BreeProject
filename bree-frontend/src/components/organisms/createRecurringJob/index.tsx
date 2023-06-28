import { Grid, Icon, Typography, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Job } from '../../../pages/jobsDashboard';
import TextField from '../../atoms/textField';
import Button from '../../atoms/button';
import { Cron } from 'react-js-cron';

const sxStyles = {
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '630px',
    padding: '20px',
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

const StyledCron = styled(Cron)({
  display:"flex",
  flexDirection:"row",
})

interface JobFormProps {
  onClickCloseIcon: () => void;
  onClickJobCreate: (jobInfo: Job) => void;
}

const CreateRecurringJob = (props: JobFormProps) => {
  const [jobName, setJobName] = useState('');
  const [jobData, setJobData] = useState('');
  const [jobRecurring, setJobRecurring] = useState('30 5 * * 1,6');

  const onChangeJobName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobName(event.target.value);
  };

  const onChangeJobData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobData(event.target.value);
  };

  const onClickJobCreate = () => {
    if (jobName && jobRecurring && jobData) {
      const job: Job = {
        name: jobName,
        time: jobRecurring,
        data:jobData,
        isRecurringJob: true,
        isActive: false
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
          <h1>Create Recurring Job</h1>
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
          <StyledCron value={jobRecurring} setValue={setJobRecurring}  />
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

export default CreateRecurringJob;