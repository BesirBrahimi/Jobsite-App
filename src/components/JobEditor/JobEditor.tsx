import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
} from "@mui/material";
import "./JobEditor.css"
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";

const JobEditor: React.FC = () => {
  const { jobs, setJobs,  } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedJob = jobs.find((job) => job.id === id);

  const [jobTitle, setJobTitle] = useState<string>(selectedJob?.title || "");
  const [jobStatus, setJobStatus] = useState<string>(
    selectedJob?.status || "Completed"
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    selectedJob?.categories || []
  );

  const handleCloseModal = () => {
    navigate("/");
  };

  const handleSaveJob = () => {
    if (selectedJob) {
      const updatedJobs = jobs.map((job) =>
        job.id === selectedJob.id
          ? { ...job, title: jobTitle, status: jobStatus, categories: selectedCategories }
          : job
      );

      setJobs(updatedJobs);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));

      navigate("/");
    }
  };

  return (
    <Box sx={{ width: "100%", height: "92.5vh" }}>
      <Box sx={{ margin: "30px auto" }}>
        <Typography
          style={{
            fontWeight: 600,
            color: "#696564",
            fontSize: 24,
            margin: "20px auto",
          }}
        >
          Editing job:
          <span
            style={{
              textDecoration: "underline",
              color: "black",
              fontWeight: 700,
            }}
          >{`"${jobTitle}"`}</span>
        </Typography>
        <Box className="modal-edit">
          <TextField
            label="Job Title"
            style={{margin:"10px auto", width:"30%" }}
                        value={jobTitle}
            variant="filled"
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <FormControl style={{margin:"10px auto", width:"30%" }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={jobStatus}
              onChange={(e) => setJobStatus(e.target.value as string)}
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="On Road">On Road</MenuItem>
              <MenuItem value="On Hold">On Hold</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{margin:"10px auto", width:"30%" }}>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={(e) =>
                setSelectedCategories(e.target.value as string[])
              }
              renderValue={(selected) => (
                <div>
                  {selected.map((category) => (
                    <Chip key={category} label={category} />
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
            style={{ width: "30%", margin: "2px auto" }}
            variant="contained"
            color="primary"
            onClick={handleSaveJob}
          >
            Save
          </Button>
          <Button
            style={{ width: "30%", margin: "10px auto" }}
            variant="contained"
            color="error"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JobEditor;
