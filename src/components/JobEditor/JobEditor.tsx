import React from "react";
import { useForm, Controller } from "react-hook-form";
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
import "./JobEditor.css";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";

const JobEditor: React.FC = () => {
  const { jobs, setJobs } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedJob = jobs.find((job) => job.id === id);

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: selectedJob?.title || "",
      status: selectedJob?.status || "Completed",
      categories: selectedJob?.categories || [],
    },
  });

  const onSubmit = (data: any) => {
    if (selectedJob) {
      const updatedJobs = jobs.map((job) =>
        job.id === selectedJob.id ? { ...job, ...data } : job
      );
      
      const index = updatedJobs.findIndex((job) => job.id === selectedJob.id);
      if (index !== -1) {
        const editedJob = updatedJobs.splice(index, 1)[0];
        updatedJobs.unshift(editedJob);
        setJobs(updatedJobs);
        localStorage.setItem("jobs", JSON.stringify(updatedJobs));
        navigate("/");
      }
    }
  };

  return (
    <Box sx={{ width: "100%", height: "92.5vh" }}>
      <Box sx={{ margin: "30px auto" }}>
        <Typography sx={{ fontWeight: 600, color: "#696564", fontSize: 24, margin: "20px auto" }}>
          Editing job:
          <span style={{ textDecoration: "underline", color: "black", fontWeight: 700 }}>
            {` "${watch("title")}"`}
          </span>
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="modal-edit">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField label="Job Title" sx={{ margin: "10px auto", width: "30%" }} variant="filled" {...field} />
              )}
            />

            <FormControl sx={{ margin: "10px auto", width: "30%" }}>
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="On Road">On Road</MenuItem>
                    <MenuItem value="On Hold">On Hold</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl sx={{ margin: "10px auto", width: "30%" }}>
              <InputLabel>Categories</InputLabel>
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <Select
                    multiple
                    {...field}
                    onChange={(e) => setValue("categories", e.target.value as string[])}
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
                )}
              />
            </FormControl>
          </Box>
          <Box className="modal-2">
            <Button sx={{ width: "30%", margin: "2px auto" }} variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button sx={{ width: "30%", margin: "10px auto" }} variant="contained" color="error" onClick={() => navigate("/")}>Cancel</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default JobEditor;