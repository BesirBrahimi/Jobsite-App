import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Data } from "../JobEditorCategory/JobEditorCategory";

type AddDataModalProps = {
  open: boolean;
  onClose: () => void;
  onAddData: (data: Data) => void;
  initialData?: Data | null;
  category: string | null;
};

const AddDataModal: React.FC<AddDataModalProps> = ({
  open,
  onClose,
  onAddData,
  initialData,
  category,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: initialData || {
      id: uuidv4(),
      Nr: "",
      Quantity: "",
      Description: "",
      Notes: "",
      category,
    },
  });

  useEffect(() => {
    reset(
      initialData || {
        id: uuidv4(),
        Nr: "",
        Quantity: "",
        Description: "",
        Notes: "",
        category,
      }
    );
  }, [initialData, reset, category]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onAddData)}>
        <DialogTitle>{initialData ? "Edit Data" : "Add Data"}</DialogTitle>
        <DialogContent sx={{ width: "80%", margin: "5px auto" }}>
          <TextField
            label="Nr"
            type="number"
            fullWidth
            variant="filled"
            {...register("Nr", { required: "Nr is required" })}
            error={!!errors.Nr}
            helperText={errors.Nr?.message}
            sx={{ marginY: 1 }}
          />
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            variant="filled"
            {...register("Quantity", { required: "Quantity is required" })}
            error={!!errors.Quantity}
            helperText={errors.Quantity?.message}
            sx={{ marginY: 1 }}
          />
          <TextField
            label="Description"
            fullWidth
            variant="filled"
            {...register("Description", { required: "Description is required" })}
            error={!!errors.Description}
            helperText={errors.Description?.message}
            sx={{ marginY: 1 }}
          />
          <TextField
            label="Notes"
            fullWidth
            variant="filled"
            {...register("Notes")}
            error={!!errors.Notes}
            helperText={errors.Notes?.message}
            sx={{ marginY: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error" variant="contained">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            {initialData ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDataModal;