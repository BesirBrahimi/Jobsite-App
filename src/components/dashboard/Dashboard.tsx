import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Job, useGlobalContext } from "../../context";
import Header from "../header/Header";
import CreateJob from "../CreateJob/CreateJob";
import { DragDropContext, Draggable, Droppable, DropResult  } from 'react-beautiful-dnd';

const Dashboard = () => {
  const [searchInput, setSearchInput] = useState<string>(""); // State for search input
  const [openJobModal, setOpenJobModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const navigate = useNavigate();

  const { jobs, setJobs } = useGlobalContext();

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    navigate(`job-editor/${job.id}`);
  };

  const handleCategoryClick = (job: Job) => {
    navigate(`/job-editor-category/${job.id}`);
  };

  const filteredJobs = jobs
    ? jobs.filter((job) =>
        job.title?.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'On Road':
        return 'status-on-road';
      case 'On Hold':
        return 'status-on-hold';
      default:
        return '';
    }
  };

  const openCreateJobModal = () => {
    setOpenJobModal(true);
  };

  const handleDeleteJob = (jobId: string) => {
    if (jobs) {
      const updatedJobs = jobs.filter((job) => job.id !== jobId);
      setJobs(updatedJobs);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    }
  };

  const onDragEnd = (result: DropResult ) => {
    if (!result.destination) {
      return; // Dragged outside the list, do nothing
    }

    // Reorder the jobs in the jobs array
    const updatedJobs = [...jobs];
    const [reorderedJob] = updatedJobs.splice(result.source.index, 1);
    updatedJobs.splice(result.destination.index, 0, reorderedJob);

    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  return (
    <div className="App">
      <Header
        completedCount={jobs ? jobs.filter((job) => job.status === "Completed").length : 0}
        onRoadCount={jobs ? jobs.filter((job) => job.status === "On Road").length : 0}
        onHoldCount={jobs ? jobs.filter((job) => job.status === "On Hold").length : 0}
      />
      <div className="header-dashboard">
        <p className="info-icon">
          <InfoIcon /> Informative piece of text that can be used regarding this
          modal.
        </p>
        <div>
          <input
            className="search-jobs"
            type="search"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="button" onClick={openCreateJobModal}>
            CREATE
          </button>
        </div>
      </div>
      <div className="job-list">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="job-list">
            {(provided) => (
              <div className="final-job" {...provided.droppableProps} ref={provided.innerRef}>
                <div className="title-status">
                  <p style={{ width: "60%", fontSize: "18px" }}>Jobs Name:</p>
                  <p style={{ width: "10%",marginLeft:"110px", fontSize: "18px" }}>Job Status:</p>
                </div>
                {filteredJobs.map((job, index) => (
                  <Draggable key={job.id} draggableId={job.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`job-item ${index % 2 === 0 ? "" : "job-example"}`}
                      >
                        <div className="job">
                          <div
                            style={{ cursor: "pointer", width: "52%" }}
                            className="job-name"
                            onClick={() => handleCategoryClick(job)}
                          >
                            <p className="paragraph">{job.title}</p>
                          </div>
                          <div style={{ width: "215px" }} className={`job-status ${getStatusColorClass(job.status)}`}>
                            <p>{job.status}</p>
                          </div>
                          <div className="buttons">
                            <Button sx={{ width: "5%", height: "20px" }} onClick={() => handleDeleteJob(job.id)} variant="contained" color="error" className="delete-button">Delete</Button>
                            <Button sx={{ width: "5%", height: "20px" }} variant="contained" color="primary" onClick={() => handleJobClick(job)}>Edit</Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {openJobModal && <CreateJob openJobModal={openJobModal} setOpenJobModal={setOpenJobModal} />}
    </div>
  );
};

export default Dashboard;



/////////////////////////////////////////////////////// 

// Without drag and drop: 

// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";
// import InfoIcon from "@mui/icons-material/Info";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button } from "@mui/material";
// import { Job, useGlobalContext } from "../../context";
// import Header from "../header/Header";
// import CreateJob from "../CreateJob/CreateJob";
// import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';



// const Dashboard = () => {
//   const [searchInput, setSearchInput] = useState<string>(""); // State for search input
//   const [openJobModal, setOpenJobModal] = useState<boolean>(false)
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);

//   const navigate = useNavigate();

//   const { jobs, setJobs } = useGlobalContext();


//   const handleJobClick = (job: Job) => {
//     setSelectedJob(job);
//     navigate(`job-editor/${job.id}`);
//   };

//   const handleCategoryClick = (job: Job) => {
//     navigate(`/job-editor-category/${job.categories}`);
//   };

//   const filteredJobs = jobs
//   ? jobs.filter((job) =>
//       job.title?.toLowerCase().includes(searchInput.toLowerCase())
//     )
//   : [];  

//   const getStatusColorClass = (status: string) => {
//     switch (status) {
//       case 'Completed':
//         return 'status-completed';
//       case 'On Road':
//         return 'status-on-road';
//       case 'On Hold':
//         return 'status-on-hold';
//       default:
//         return '';
//     }
//   };

//   const openCreateJobModal = () =>{
//     setOpenJobModal(true)
//   }
//   const handleDeleteJob = (jobId: string) => {
//     if (jobs) {
//       const updatedJobs = jobs.filter((job) => job.id !== jobId);
//       setJobs(updatedJobs);
//       localStorage.setItem("jobs", JSON.stringify(updatedJobs));
//     }
//   };

  

//   return (
//     <div className="App">
//      <Header
//         completedCount={jobs ? jobs.filter((job) => job.status === "Completed").length : 0}
//         onRoadCount={jobs ? jobs.filter((job) => job.status === "On Road").length : 0}
//         onHoldCount={jobs ? jobs.filter((job) => job.status === "On Hold").length : 0}
//       />
//       <div className="header-dashboard">
//         <p className="info-icon">
//           <InfoIcon /> Informative piece of text that can be used regarding this
//           modal.
//         </p>
//         <div>
//           <input
//             className="search-jobs"
//             type="search"
//             placeholder="Search..."
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//           />
//           <button className="button" onClick={openCreateJobModal}>
//             CREATE
//           </button>
//         </div>
//       </div>
//       <div className="job-list">
//       <div className="title-status">
//         <p style={{ width:"25%", marginLeft:"20px", fontSize:"18px"}}>Jobs Name</p>
//         <p style={{ width:"10%", marginRight:"60px", fontSize:"18px"}}>JobStatus</p>
//       </div>
//         {filteredJobs.map((job, index) => (
//           <div
//             key={index}
//             className={`job-item ${index % 2 === 0 ? "" : "job-example"}`}
//           >
//             <div className="job"> 
//               <div
//                 style={{ cursor: "pointer", width: "60%" }}
//                 className="job-name"
//                 onClick={() =>handleCategoryClick(job)}
//               >
//                 <p className="paragraph">{job.title}</p>
//               </div>
//               <div style={{ width: "215px" }} className={`job-status ${getStatusColorClass(job.status)}`}>
//                 <p>{job.status}</p>
//               </div>
//              <div className="buttons">
//              <Button sx={{ width: "5%", height: "20px" }} onClick={()=> handleDeleteJob(job.id)} variant="contained" color="error" className="delete-button">Delete</Button>
//               <Button sx={{ width: "5%", height: "20px" }} variant="contained" color="primary" onClick={() => handleJobClick(job)}>Edit</Button>
//              </div>
//             </div>
//           </div>
//         ))}
//               {openJobModal && <CreateJob openJobModal={openJobModal} setOpenJobModal={setOpenJobModal} />}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;