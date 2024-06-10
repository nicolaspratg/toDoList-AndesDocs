import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteAllItems } from "../utils/deleteAllItems";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteAllModalProps {
  open: boolean;
  onClose: () => void;
  onDeleteAll: () => void;
}

const DeleteAllModal: React.FC<DeleteAllModalProps> = ({
  open,
  onClose,
  onDeleteAll,
}) => {
  const handleDeleteAll = async () => {
    try {
      await deleteAllItems();
      onDeleteAll();
    } catch (error) {
      console.error("Error deleting all items:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete All Items</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete all items? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          style={{ backgroundColor: "#831ea3", color: "white" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDeleteAll}
          color="secondary"
          startIcon={<DeleteIcon />}
          style={{ backgroundColor: "#831ea3", color: "white" }}
        >
          Delete All
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAllModal;
