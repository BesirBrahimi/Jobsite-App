import React from 'react';
import {
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  SelectChangeEvent
} from '@mui/material';
import { useGlobalContext } from '../../context';

type OpenModal = {
    openJobModal : boolean;
    setOpenJobModal: (openJobModal:boolean) => void
  }
  

const CreateJob: React.FC<OpenModal> = ({openJobModal, setOpenJobModal}) => {
  const {
    selectedCategories,
    setSelectedCategories,
    handleSaveJob,
    setJobTitle,
    jobTitle,
    jobStatus,
    setJobStatus,
  } = useGlobalContext();

  const handleCloseModal = () => {
    setOpenJobModal(false);
  };

  const handleCategoryChange =(event: SelectChangeEvent<string[]>) => {
    setSelectedCategories(event.target.value as string[]);
  };

  const createNewJob = () => {
    handleSaveJob()
    setOpenJobModal(false);
  }
  

  return (
    <Modal open={openJobModal} onClose={handleCloseModal}>
      <Box sx={{padding:"20px"}}>
        <Box className="modal-box">
          <Box className="modal-1">
          <h2 style={{margin:"20px auto"}}>Create New Job</h2>
            <TextField
              label="Job Title"
              variant="filled"
              style={{ backgroundColor: 'white', width: '100%' }}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <FormControl style={{ width: '100%', marginTop: '20px' }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={jobStatus}
                onChange={(e) => setJobStatus(e.target.value)}
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="On Road">On Road</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ width: '100%', marginTop: '20px' }}>
              <InputLabel>Categories</InputLabel>
              <Select
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                <MenuItem value="Sidewalk Shed">Sidewalk Shed</MenuItem>
                <MenuItem value="Scaffold">Scaffold</MenuItem>
                <MenuItem value="Sharing">Sharing</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="modal-2">
            <Button
              style={{ width: '56%', margin: '10px auto' }}
              variant="contained"
              color="primary"
              disabled={jobTitle.trim().length === 0 || jobStatus.trim().length === 0 || selectedCategories.length === 0}
              onClick={createNewJob}
            >
              Save
            </Button>
            <Button
              style={{ width: '56%', margin: '10px auto' }}
              variant="contained"
              color="error"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateJob;
