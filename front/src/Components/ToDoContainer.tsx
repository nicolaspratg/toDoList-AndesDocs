import React, { useState, useEffect } from "react";
import { Button, Container, Paper } from "@mui/material";
import AddTodoModal from "../modals/AddToDoModal";
import EditToDoModal from "../modals/EditToDoModal";
import { getAllItems } from "../utils/getAllItems";
import TodoItem from "../types";
import { addOrUpdateItem } from "../utils/addOrUpdateItem";
import ListItemComponent from "./ListItem";
import Header from "./Header";
import ToDoItem from "../types";
import DeleteAllModal from "../modals/DeleteAllModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAllItems } from "../utils/deleteAllItems";
import updateItemCompletion from "../utils/updateItemCompletion";

const ToDoContainer: React.FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [selectedToDo, setSelectedToDo] = useState<ToDoItem | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    fetchTodoItems();
  }, []);

  const fetchTodoItems = async () => {
    try {
      const items = await getAllItems();
      setTodoItems(items);
    } catch (error) {
      console.error("Error fetching to-do items:", error);
    }
  };

  const handleUpdateCompletion = async (
    id: string,
    updatedCompleted: boolean
  ) => {
    try {
      await updateItemCompletion(id, updatedCompleted);
      const updatedTodoItems = todoItems.map((item) =>
        item.id === id ? { ...item, completed: updatedCompleted } : item
      );
      setTodoItems(updatedTodoItems);
      setCompleted(updatedCompleted);
    } catch (error) {
      console.error("Error updating todo item:", error);
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleAddTodo = async (newTodo: TodoItem) => {
    try {
      await addOrUpdateItem(newTodo);
      setTodoItems((prevItems) => [...prevItems, newTodo]);
    } catch (error) {
      console.error("Error adding or updating to-do item:", error);
    }
  };

  const handleOpenEditModal = (todo: ToDoItem) => {
    setSelectedToDo(todo);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedToDo(null);
  };

  const handleSaveEdit = async (updatedToDo: ToDoItem) => {
    try {
      await addOrUpdateItem(updatedToDo);
      setTodoItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedToDo.id ? updatedToDo : item
        )
      );
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating to-do item:", error);
    }
  };

  const toggleExpandedItemId = (itemId: string) => {
    setExpandedItemId((prevId) => (prevId === itemId ? null : itemId));
  };

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDeleteAll = async () => {
    try {
      await deleteAllItems();
      setTodoItems([]);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting all items:", error);
    }
  };

  const handleDeleteClick = async (id: string) => {
    try {
      const updatedItems = todoItems.filter((item) => item.id !== id);
      setTodoItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: "100%",
        }}
      >
        <Header handleOpenModal={handleOpenModal} />
        <ListItemComponent
          todoItems={todoItems}
          setTodoItems={setTodoItems}
          expandedItemId={expandedItemId}
          toggleExpandedItemId={toggleExpandedItemId}
          handleEditClick={handleOpenEditModal}
          handleDeleteClick={handleDeleteClick}
          handleUpdateCompletion={handleUpdateCompletion}
        />
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <Button
            color="primary"
            onClick={handleOpenDeleteDialog}
            style={{
              backgroundColor: "#831ea3",
              color: "white",
              padding: "10px",
            }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
      </Paper>

      <AddTodoModal
        open={modalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddTodo}
      />
      <EditToDoModal
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        todo={selectedToDo}
        onSave={handleSaveEdit}
      />
      <DeleteAllModal
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onDeleteAll={handleDeleteAll}
      />
    </Container>
  );
};

export default ToDoContainer;
