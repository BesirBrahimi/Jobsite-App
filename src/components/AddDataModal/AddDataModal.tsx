import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Data } from "../JobEditorCategory/JobEditorCategory";

type AddDataModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: Data) => void;
  editedData?: Data; 
};

const AddDataModal: React.FC<AddDataModalProps> = ({
  open,
  onClose,
  onSave,
  editedData, 
}) => {
  const initialEditedData = editedData || {
    id: uuidv4(),
    Nr: "",
    Quantity: "",
    Description: "",
    Notes: "",
    category: "",
  };

  const [currentEditedData, setCurrentEditedData] =
    useState<Data>(initialEditedData);

  useEffect(() => {
    setCurrentEditedData(initialEditedData);
  }, [editedData]);

  

    const handleSave = () => {
      if(currentEditedData.Description.trim() !== "" && currentEditedData.Nr.trim() !== "" ){
          onSave(currentEditedData);
          onClose(); 
          setCurrentEditedData(initialEditedData);      
      }
    };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editedData ? "Edit Data" : "Add Data"}</DialogTitle>
      <DialogContent sx={{ width: "80%", margin: "5px auto" }}>
        <TextField
          label="Nr"
          type="number"
          fullWidth
          value={currentEditedData.Nr}
          variant="filled"
          onChange={(e) =>
            setCurrentEditedData({ ...currentEditedData, Nr: e.target.value })
          }
          style={{ margin: "10px auto" }}
        />
        <TextField
          label="Quantity"
          type="number"
          variant="filled"
          fullWidth
          value={currentEditedData.Quantity}
          onChange={(e) =>
            setCurrentEditedData({
              ...currentEditedData,
              Quantity: e.target.value,
            })
          }
          style={{ margin: "10px auto" }}
        />
        <TextField
          label="Description"
          fullWidth
          variant="filled"
          value={currentEditedData.Description}
          onChange={(e) =>
            setCurrentEditedData({
              ...currentEditedData,
              Description: e.target.value,
            })
          }
          style={{ margin: "10px auto" }}
        />
        <TextField
          label="Notes"
          fullWidth
          variant="filled"
          value={currentEditedData.Notes}
          onChange={(e) =>
            setCurrentEditedData({ ...currentEditedData, Notes: e.target.value })
          }
          style={{ margin: "10px auto" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          {editedData ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDataModal;
