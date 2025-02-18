import React from "react";
import { useForm, Controller } from "react-hook-form";
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
} from "@mui/material";
import { useGlobalContext } from "../../context";

type OpenModal = {
  openJobModal: boolean;
  setOpenJobModal: (open: boolean) => void;
};

type JobFormInputs = {
  jobTitle: string;
  jobStatus: string;
  selectedCategories: string[];
};

const CreateJob: React.FC<OpenModal> = ({ openJobModal, setOpenJobModal }) => {
  const { handleSaveJob } = useGlobalContext();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<JobFormInputs>({
    defaultValues: {
      jobTitle: "",
      jobStatus: "",
      selectedCategories: [],
    },
    mode: "onChange",
  });

  const handleCloseModal = () => {
    setOpenJobModal(false);
    reset(); 
  };

  const onSubmit = (data: JobFormInputs) => {
    handleSaveJob(data);
    setOpenJobModal(false);
    reset(); 
  };

  return (
    <Modal open={openJobModal} onClose={handleCloseModal}>
      <Box sx={{ padding: "20px" }}>
        <Box className="modal-box">
          <Box className="modal-1">

          <form onSubmit={handleSubmit(onSubmit)}>
              <h2 style={{ margin: "20px auto" }}>Create New Job</h2>

              <Controller
                name="jobTitle"
                control={control}
                rules={{ required: "Job title is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Job Title"
                    variant="filled"
                    style={{ backgroundColor: "white", width: "100%" }}
                  />
                )}
              />
              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <InputLabel>Status</InputLabel>
                <Controller
                  name="jobStatus"
                  control={control}
                  rules={{ required: "Job status is required" }}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="On Road">On Road</MenuItem>
                      <MenuItem value="On Hold">On Hold</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <InputLabel>Categories</InputLabel>
                <Controller
                  name="selectedCategories"
                  control={control}
                  rules={{ required: "At least one category is required" }}
                  render={({ field }) => (
                    <Select {...field} multiple renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </div>
                    )}>
                      <MenuItem value="Sidewalk Shed">Sidewalk Shed</MenuItem>
                      <MenuItem value="Scaffold">Scaffold</MenuItem>
                      <MenuItem value="Sharing">Sharing</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

            <Box className="modal-2">
              <Button
                style={{ width: "56%", margin: "10px auto" }}
                variant="contained"
                color="primary"
                disabled={!isValid} 
                type="submit"
              >
                Save
              </Button>
              <Button
                style={{ width: "56%", margin: "10px auto" }}
                variant="contained"
                color="error"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </Box>
          </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateJob;
