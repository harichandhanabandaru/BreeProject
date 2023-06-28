import {
  Box,
  Grid,
  Modal,
  SelectChangeEvent,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import CreateJobForm from '../../components/organisms/createJobForm';
import CreateRecurringJob from '../../components/organisms/createRecurringJob';
import CreateScheduleJob from '../../components/organisms/createScheduleJob';
import DataTable from '../../components/organisms/dataTable';
import { JobService } from '../../service/JobService';
import Button from '../../components/atoms/button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '../../components/atoms/textField';
import SearchIcon from '@mui/icons-material/Search';
import Dropdown, { DropdownOptions } from '../../components/atoms/dropdown';
import EllipsisMenu from '../../components/molecules/ellipsisMenu';

export interface Job {
  id?: number;
  name: string;
  time: string;
  status?: string;
  startTime?: string;
  endTime?: string;
  data: string;
  isRecurringJob?: boolean;
  isActive?: boolean;
}

const data = [
  {
    id: 1,
    name: 'job 1',
    time: ' ',
    status: 'pending',
    startTime: '',
    endTime: '',
    data: '',
    isRecurringJob: false,
    isActive: true
  },
  {
    id: 2,
    name: 'job 2',
    time: ' ',
    status: 'running',
    startTime: '',
    endTime: '',
    data: '',
    isRecurringJob: false,
    isActive: true
  },
  {
    id: 3,
    name: 'job 3',
    time: '',
    status: 'completed',
    startTime: '',
    endTime: '',
    data: '',
    isRecurringJob: false,
    isActive: true
  },
  {
    id: 4,
    name: 'job 4',
    time: ' ',
    status: 'failed',
    startTime: '',
    endTime: '',
    data: '',
    isRecurringJob: false,
    isActive: true
  },
  {
    id: 5,
    name: 'job 5',
    time: ' ',
    status: 'skipped',
    startTime: '',
    endTime: '',
    data: '',
    isRecurringJob: false,
    isActive: true
  }
];

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Job Name',
    width: 150,
    headerClassName: 'header-styling'
  },
  {
    field: 'time',
    headerName: 'Job Time',
    width: 150,
    headerClassName: 'header-styling'
  },
  {
    field: 'status',
    headerName: 'Job Status',
    width: 150,
    headerClassName: 'header-styling'
  },
  {
    field: 'startTime',
    headerName: 'Start Time',
    width: 150,
    headerClassName: 'header-styling'
  },
  {
    field: 'endTime',
    headerName: 'End Time',
    width: 150,
    headerClassName: 'header-styling'
  },
  {
    field: 'isActive',
    headerName: 'Is active?',
    width: 150,
    headerClassName: 'header-styling'
  }
];

const sxStyles = {
  mainGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    gap: '32px',
    height: '100%',
    width: '100%'
  },
  firstContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropdown: {
    width: '200px',
    alignItems: 'left',
    justifyContent: 'left'
  }
};

const dropdownOptions: DropdownOptions[] = [
  {
    key: 'all',
    value: 'All'
  },
  {
    key: 'running',
    value: 'Running'
  },
  {
    key: 'pending',
    value: 'Pending'
  },
  {
    key: 'completed',
    value: 'Completed'
  },
  {
    key: 'failed',
    value: 'Failed'
  },
  {
    key: 'skipped',
    value: 'Skipped'
  }
];

const JobsDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [open, setOpen] = useState(false);
  const [openRecurring, setOpenRecurring] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [recurringJobs, setRecurringJobs] = useState<Job[]>([]);
  const [scheduleJobs, setScheduleJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState(0);

  const [statusFilter, setStatusFilter] = useState('running');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    getJobs();
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
    const response = await JobService.searchJobs(event.target.value);
    setJobs(response);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setStatusFilter(event.target.value);

    if (value === 'all') {
      getJobs();
    } else {
      getJobsByStatus(value);
    }
  };

  const getJobs = useCallback(async () => {
    if (value === 0) {
      const response = await JobService.getJobs();
      setJobs(response);
    } else if (value === 1) {
      const response = await JobService.getRecurringJobs();
      setRecurringJobs(response);
    } else {
      const response = await JobService.getScheduleJobs();
      setScheduleJobs(response);
    }
  }, [value]);

  const getJobsByStatus = async (status: string) => {
    const response = await JobService.getJobsByStatus(status);
    setJobs(response);
  };

  const onClickJobCreate = async (job: Job) => {
    const response = await JobService.createJobs(job);
    console.log('Job: ' + JSON.stringify(job));
    console.log(' resonse  ', response);
  };

  const onClickRecurringJobCreate = async (job: Job) => {
    const response = await JobService.createRecurringJobs(job);
    console.log('Job: ' + JSON.stringify(job));
    console.log(' resonse  ', response);
  };

  const onClickScheduleJobCreate = async (job: Job) => {
    // ADD API call here
    console.log("creating job started")
    const response = await JobService.createScheduleJobs(job);
    console.log('Job: ' + JSON.stringify(job));
    console.log(' resonse  ', response);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalRecurringOpen = () => {
    setOpenRecurring(true);
  };
  const handleModalScheduleOpen = () => {
    setOpenSchedule(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };
  const handleModalRecurringClose = () => {
    setOpenRecurring(false);
  };
  const handleModalScheduleClose = () => {
    setOpenSchedule(false);
  };

  useEffect(() => {
    getJobsByStatus('running');
  }, []);

  const handleEllipsisMenuSelect = async (selectedOption: string, id: any) => {
    if (selectedOption === 'Pause Job') {
      const response = await JobService.pauseJobId(id);

      console.log(' response ', response);
      const response2 = await JobService.getJobsByStatus(statusFilter);
      setJobs(response2);
    } else if (selectedOption === 'Stop Job') {
      const response = await JobService.stopJobId(id);

      console.log(' response ', response);
      const response2 = await JobService.getJobsByStatus(statusFilter);
      setJobs(response2);
    }
  };

  const modifiedColumns = [
    ...columns,
    {
      field: 'options',
      headerName: '',
      width: 150,
      renderCell: (params: any) => (
        <EllipsisMenu
          data={[
            {
              label: 'Pause Job',
              onClick() {
                handleEllipsisMenuSelect('Pause Job', params.id);
              }
            },
            {
              label: 'Stop Job',
              onClick() {
                handleEllipsisMenuSelect('Stop Job', params.id);
              }
            },
            {
              label: 'Reschedule job',
              onClick() {
                handleEllipsisMenuSelect('Reschedule job', params.id);
              }
            }
          ]}
        />
      ),
      headerClassName: 'header-styling'
    }
  ];

  return (
    <div>
      <Grid container sx={sxStyles.mainGrid}>
        <Grid item>
          <h1>Jobs Dashboard</h1>
        </Grid>
        <Grid item sx={sxStyles.firstContainer}>
          {value === 0 && (
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              backgroundColor="#8BC34A"
              textColor="black"
              onClick={handleModalOpen}
            >
              Create Job
            </Button>
          )}
          {value === 1 && (
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              backgroundColor="#8BC34A"
              textColor="black"
              onClick={handleModalRecurringOpen}
            >
              Create Recurring Job
            </Button>
          )}
          {value === 2 && (
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              backgroundColor="#8BC34A"
              textColor="black"
              onClick={handleModalScheduleOpen}
            >
              Createschedule Job
            </Button>
          )}
          <Grid item>
            {value === 0 && (
              <TextField
                value={search}
                onChange={handleSearchChange}
                placeholder="Search jobs"
                endAdornment={<SearchIcon />}
              />
            )}
          </Grid>
        </Grid>

        <Grid item sx={sxStyles.dropdown}>
          {value === 0 && (
            <Dropdown
              options={dropdownOptions}
              onChange={handleStatusFilterChange}
              value={statusFilter}
            />
          )}
        </Grid>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="All Jobs" {...a11yProps(0)} />
          <Tab label="Recurring Jobs" {...a11yProps(1)} />
          <Tab label="Scheduled Jobs" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid item>
            <DataTable rows={jobs} columns={jobs ? modifiedColumns : columns} />
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid item>
            <DataTable rows={recurringJobs} columns={columns} />
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid item>
            <DataTable rows={scheduleJobs} columns={columns} />
          </Grid>
        </TabPanel>
      </Grid>
      <Modal open={open}>
        <CreateJobForm
          onClickCloseIcon={handleModalClose}
          onClickJobCreate={onClickJobCreate}
        />
      </Modal>

      <Modal open={openRecurring}>
        <CreateRecurringJob
          onClickCloseIcon={handleModalRecurringClose}
          onClickJobCreate={onClickRecurringJobCreate}
        />
      </Modal>

      <Modal open={openSchedule}>
        <CreateScheduleJob
          onClickCloseIcon={handleModalScheduleClose}
          onClickJobCreate={onClickScheduleJobCreate}
        />
      </Modal>
    </div>
  );
};

export default JobsDashboard;
