import { Box, Grid, Modal, Typography, styled } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Job } from '../../../pages/jobsDashboard';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Table {
  rows: GridRowsProp;
  columns: GridColDef[];
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  borderRadius: '8px',
  boxShadow: 24,
  //   minHeight:"300px",
  padding: '20px',
//   paddingBottom: '60px'
};

const StyledDiv = styled('div')({
//   paddingTop: '20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  alignItems: 'center'
});

const getTextColor = (status: string | undefined) => {
  switch (status) {
    case 'pending':
      return '#F5A623'; // orange
    case 'running':
      return '#007BFF'; // blue
    case 'completed':
      return '#28A745'; // green
    case 'failed':
      return '#DC3545'; // red
    case 'skipped':
      return '#6C757D'; // gray
    default:
      return 'inherit';
  }
};

const DataTable = ({ rows, columns }: Table) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTableRowClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  return (
    <Grid
      sx={{
        '& .header-styling': {
          backgroundColor: '#F5F4F5'
        }
      }}
    >
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StyledDiv>
            <CloseIcon fontSize="medium" onClick={handleCloseModal} />
          </StyledDiv>
          {selectedJob && (
            <>
              <Typography
                sx={{ textAlign: 'center', marginBottom: '40px' }}
                variant="h6"
              >
                Job Details
              </Typography>
              <Typography>
                <strong>Job: </strong>
                {selectedJob.name}
              </Typography>
              <Typography>
                <strong>Time: </strong>
                {selectedJob.time}
              </Typography>
              <Typography>
                <strong>Status: </strong>
                <span style={{ color: getTextColor(selectedJob.status) }}>
                  {selectedJob.status}
                </span>
              </Typography>
            </>
          )}
        </Box>
      </Modal>
      <DataGrid
        rows={rows}
        columns={columns.map((column) => ({ ...column, sortable: false }))}
        pagination={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        onRowClick={(params) => {
          handleTableRowClick(params.row as Job);
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        disableColumnMenu
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        autoHeight
      />
    </Grid>
  );
};

export default DataTable;
