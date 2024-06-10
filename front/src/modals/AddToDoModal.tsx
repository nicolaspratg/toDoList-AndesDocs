import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

interface AddTodoModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (todo: TodoItem) => void;
}

interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoItem>();

  const onSubmit: SubmitHandler<TodoItem> = (data) => {
    const todoWithId = {
      ...data,
      id: Math.floor(Math.random() * 1000).toString(),
    }; // Add id to todo
    onAdd(todoWithId);
    onClose();
    reset({
      id: Math.floor(Math.random() * 1000).toString(),
      title: "",
      description: "",
      completed: false,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Add New To-Do
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="title"
            {...register("title", { required: true })}
            label="Title"
            variant="outlined"
            fullWidth
            error={!!errors.title}
            helperText={errors.title && "Title is required"}
            sx={{ mb: 2 }}
          />
          <TextField
            id="description"
            {...register("description", { required: true })}
            label="Description"
            variant="outlined"
            fullWidth
            error={!!errors.description}
            helperText={errors.description && "Description is required"}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#831ea3" }}
            >
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTodoModal;
