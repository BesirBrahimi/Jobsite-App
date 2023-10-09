import React, { useEffect, useState } from "react";
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
import "./JobEditorCategory.css";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import AddDataModal from "../AddDataModal/AddDataModal";
export type Data = {
  id: string;
  Nr: string;
  Quantity: string;
  Description: string;
  Notes: string;
  category: string | null;
};

type CategoryContent = {
  [key: string]: Data[]; 
};

const JobEditorCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddDataModalOpen, setAddDataModalOpen] = useState(false);
  const [categoryContent, setCategoryContent] = useState<CategoryContent>({});
  const [selectedRowData, setSelectedRowData] = useState<Data | null>(null);
  const {jobs} = useGlobalContext()
  const { category } = useParams();
  const navigate = useNavigate();

  const selectedJob = jobs.find((job) => job.title === category);
  
  const handleGoBack = () => {
    navigate("/");
  };

  const handleOpenAddDataModal = () => {
    setSelectedRowData(null);
    setAddDataModalOpen(true);
  };

  const handleCloseAddDataModal = () => {
    setAddDataModalOpen(false);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCategoryContent((prevContent) => ({
      ...prevContent,
      [categoryName]: prevContent?.[categoryName] || [],
    }));
  };

  const addDataToCategory = (data: Data) => {
    if (selectedCategory && categoryContent) {
      setCategoryContent((prevContent) => ({
        ...prevContent,
        [selectedCategory]: [...(prevContent[selectedCategory] || []), data],
      }));
    }
  };

  const handleEditRow = (rowData: Data) => {
    setSelectedRowData(rowData);
    setAddDataModalOpen(true);
  };

  const handleSaveEditedData = (editedData: Data) => {
    if (selectedCategory && categoryContent) {
      const categoryData = categoryContent[selectedCategory] || [];
      const dataIndex = categoryData.findIndex(
        (item) => item.id === editedData.id
      );

      if (dataIndex !== -1) {
        categoryData[dataIndex] = editedData;

        setCategoryContent((prevContent) => ({
          ...prevContent,
          [selectedCategory]: categoryData,
        }));

        setAddDataModalOpen(false);
      }
    }
  };

  

  return (
    <Box className="modal">
      <Box sx={{ width: "95%", margin: "30px auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper
              elevation={3}
              style={{ padding: "16px", height: "85vh", width: "100%" }}
            >
              <h3>Categories</h3>
              <h3>{selectedJob?.title}</h3>
              <ul className="categories">
                {category &&
                  category.split(",").map((cat, index) => (
                    <li
                      className="categories-list"
                      key={index}
                      onClick={() => handleCategoryClick(cat.trim())}
                    >
                      <span
                        className={`category ${
                          selectedCategory?.includes(cat.trim())
                            ? "selected"
                            : ""
                        }`}
                      >
                        {cat.trim()}
                      </span>
                    </li>
                  ))}
              </ul>
              <Button
                variant="contained"
                style={{ marginTop: "10px", width:"250px" , backgroundColor:"red"}}
                onClick={handleGoBack}
              >
                Go Back
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "93%",
                }}
              >
                <h3>{selectedCategory && selectedCategory}</h3>
                {selectedCategory && <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenAddDataModal}
                >
                  Add Data
                </Button>}
              </Box>
              {selectedCategory && (
                <Box>
                  <TableContainer>
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
                        {categoryContent[selectedCategory]?.map(
                          (item: Data, index: number) => (
                            <TableRow
                              key={item.id}
                              style={{ cursor: "pointer" }}
                              onClick={()=> handleEditRow(item)}
                            >
                              <TableCell>{item.Nr}</TableCell>
                              <TableCell>{item.Quantity}</TableCell>
                              <TableCell>{item.Description}</TableCell>
                              <TableCell>{item.Notes}</TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Paper>
          </Grid>
          <AddDataModal
            open={isAddDataModalOpen}
            onClose={handleCloseAddDataModal}
            onSave={selectedRowData ? handleSaveEditedData : addDataToCategory}
            editedData={selectedRowData ?? undefined} 
            />
        </Grid>
      </Box>
    </Box>
  );
};

export default JobEditorCategory;
