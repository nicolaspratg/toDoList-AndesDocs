import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ToDoItem from "../types";

interface EditToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: ToDoItem | null;
  onSave: (updatedToDo: ToDoItem) => void;
}

const EditToDoModal: React.FC<EditToDoModalProps> = ({
  isOpen,
  onClose,
  todo,
  onSave,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false); // Declare completed state

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed); // Initialize completed state
    }
  }, [todo]);

  const handleSave = () => {
    if (todo) {
      const updatedToDo = { ...todo, title, description, completed };
      onSave(updatedToDo);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit ToDo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          }
          label="Completed"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          style={{ backgroundColor: "#831ea3" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ backgroundColor: "#831ea3" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditToDoModal;
