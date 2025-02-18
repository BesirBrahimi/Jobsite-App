import React, { useState } from "react";
import {
  Button,
  Box,
  Paper,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import AddDataModal from "../AddDataModal/AddDataModal";
import "./JobEditorCategory.css";

export type Data = {
  id: string;
  Nr: string;
  Quantity: string;
  Description: string;
  Notes: string;
  category: string | null;
};

const JobEditorCategory = () => {
  const [isAddDataModalOpen, setAddDataModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryData, setCategoryData] = useState<Record<string, Data[]>>({});
  const [selectedData, setSelectedData] = useState<Data | null>(null);

  const { jobs } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedJob = jobs.find((job) => job.id === id);

  const handleGoBack = () => navigate("/");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedData(null);
  };
  
  const handleAddData = (newData: Data) => {
    if (selectedCategory) {
      if (selectedData) {
        setCategoryData((prev) => ({
          ...prev,
          [selectedCategory]: prev[selectedCategory].map((data) =>
            data.id === newData.id ? newData : data
          ),
        }));
      } else {
        setCategoryData((prev) => ({
          ...prev,
          [selectedCategory]: [...(prev[selectedCategory] || []), newData],
        }));
      }
    }
    setAddDataModalOpen(false);
    setSelectedData(null); 
  };

  const handleEditData = (data: Data) => {
    setSelectedData(data);
    setAddDataModalOpen(true);
  };

  return (
    <Box className="modal">
      <Box sx={{ width: "95%", margin: "30px auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper elevation={3} style={{ padding: "16px", height: "85vh", width: "100%" }}>
              <p className="desc">
                Job selected:{" "}
                <span className="job-name-category">{selectedJob?.title}</span>
              </p>
              <h4>Categories</h4>
              <ul className="categories">
                 {selectedJob?.categories.map((category, index) => (
                  <li
                    className="categories-list"
                    key={index}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <span
                      className={`category ${
                        selectedCategory?.includes(category) ? "selected" : ""
                      }`}
                    >
                      {category}
                    </span>
                  </li>
                ))}

              </ul>
              <Button variant="contained" style={{ marginTop: "10px", width: "250px", backgroundColor: "red" }} onClick={handleGoBack}>
                Go Back
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={9}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3>{selectedCategory ? `Data for ${selectedCategory}` : "Select a category"}</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setAddDataModalOpen(true)}
                  disabled={!selectedCategory}
                >
                  Add Data
                </Button>
              </Box>

              {selectedCategory && categoryData[selectedCategory]?.length > 0 ? (
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nr</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Notes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categoryData[selectedCategory].map((data, index) => (
                        <TableRow key={index} onClick={() => handleEditData(data)} style={{ cursor: "pointer" }}>
                          <TableCell>{data.Nr}</TableCell>
                          <TableCell>{data.Quantity}</TableCell>
                          <TableCell>{data.Description}</TableCell>
                          <TableCell>{data.Notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : selectedCategory ? (
                <p>No data added for this category.</p>
              ) : (
                <p>Please select a category.</p>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <AddDataModal
        open={isAddDataModalOpen}
        onClose={() => setAddDataModalOpen(false)}
        onAddData={handleAddData}
        initialData={selectedData}
        category={selectedCategory}
      />
    </Box>
  );
};

export default JobEditorCategory;



// import React, { useState } from "react";
// import {
//   Button,
//   Box,
//   Paper,
//   Grid,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { useGlobalContext } from "../../context";
// import AddDataModal from "../AddDataModal/AddDataModal";
// import "./JobEditorCategory.css";

// export type Data = {
//   id: string;
//   Nr: string;
//   Quantity: string;
//   Description: string;
//   Notes: string;
//   category: string | null;
// };

// const JobEditorCategory = () => {
//   const [state, setState] = useState({
//     isAddDataModalOpen: false,
//     selectedCategory: null as string | null,
//     selectedData: null as Data | null,
//     categoryData: {} as Record<string, Data[]>,
//   });

//   const { jobs } = useGlobalContext();
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const selectedJob = jobs.find((job) => job.id === id);

//   const handleGoBack = () => navigate("/");

//   const handleCategorySelect = (category: string) => {
//     setState((prev) => ({ ...prev, selectedCategory: category, selectedData: null }));
//   };

//   const handleAddData = (newData: Data) => {
//     setState((prev) => {
//       const updatedData = prev.selectedCategory
//         ? {
//             ...prev.categoryData,
//             [prev.selectedCategory]: prev.selectedData
//               ? prev.categoryData[prev.selectedCategory].map((data) =>
//                   data.id === newData.id ? newData : data
//                 )
//               : [...(prev.categoryData[prev.selectedCategory] || []), newData],
//           }
//         : prev.categoryData;

//       return {
//         ...prev,
//         isAddDataModalOpen: false,
//         selectedData: null,
//         categoryData: updatedData,
//       };
//     });
//   };

//   const handleEditData = (data: Data) => {
//     setState((prev) => ({ ...prev, selectedData: data, isAddDataModalOpen: true }));
//   };

//   return (
//     <Box className="modal">
//       <Box sx={{ width: "95%", margin: "30px auto" }}>
//         <Grid container spacing={2}>
//           <Grid item xs={3}>
//             <Paper elevation={3} style={{ padding: "16px", height: "85vh", width: "100%" }}>
//               <p className="desc">
//                 Job selected: <span className="job-name-category">{selectedJob?.title}</span>
//               </p>
//               <h4>Categories</h4>
//               <ul className="categories">
//                 {selectedJob?.categories.map((category, index) => (
//                   <li className="categories-list" key={index} onClick={() => handleCategorySelect(category)}>
//                     <span className={`category ${state.selectedCategory === category ? "selected" : ""}`}>
//                       {category}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//               <Button variant="contained" style={{ marginTop: "10px", width: "250px", backgroundColor: "red" }} onClick={handleGoBack}>
//                 Go Back
//               </Button>
//             </Paper>
//           </Grid>

//           <Grid item xs={9}>
//             <Paper elevation={3} style={{ padding: "16px" }}>
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <h3>{state.selectedCategory ? `Data for ${state.selectedCategory}` : "Select a category"}</h3>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => setState((prev) => ({ ...prev, isAddDataModalOpen: true }))}
//                   disabled={!state.selectedCategory}
//                 >
//                   Add Data
//                 </Button>
//               </Box>

//               {state.selectedCategory && state.categoryData[state.selectedCategory]?.length > 0 ? (
//                 <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Nr</TableCell>
//                         <TableCell>Quantity</TableCell>
//                         <TableCell>Description</TableCell>
//                         <TableCell>Notes</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {state.categoryData[state.selectedCategory].map((data, index) => (
//                         <TableRow key={index} onClick={() => handleEditData(data)} style={{ cursor: "pointer" }}>
//                           <TableCell>{data.Nr}</TableCell>
//                           <TableCell>{data.Quantity}</TableCell>
//                           <TableCell>{data.Description}</TableCell>
//                           <TableCell>{data.Notes}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               ) : state.selectedCategory ? (
//                 <p>No data added for this category.</p>
//               ) : (
//                 <p>Please select a category.</p>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>

//       <AddDataModal
//         open={state.isAddDataModalOpen}
//         onClose={() => setState((prev) => ({ ...prev, isAddDataModalOpen: false }))}
//         onAddData={handleAddData}
//         initialData={state.selectedData}
//         category={state.selectedCategory}
//       />
//     </Box>
//   );
// };

// export default JobEditorCategory;