import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Checkbox, List } from "@mui/material";
import ToDoItem from "../types";
import { EditNoteOutlined } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteItemById } from "../utils/deleteById";
import updateItemCompletion from "../utils/updateItemCompletion";

interface ListItemProps {
  todoItems: ToDoItem[];
  setTodoItems: (items: ToDoItem[]) => void;
  expandedItemId: string | null;
  toggleExpandedItemId: (id: string) => void;
  handleEditClick: (todo: ToDoItem) => void;
  handleDeleteClick: (id: string) => void;
  handleUpdateCompletion: (id: string, updatedCompleted: boolean) => void;
}

const ListItemComponent: React.FC<ListItemProps> = ({
  todoItems,
  setTodoItems,
  expandedItemId,
  toggleExpandedItemId,
  handleEditClick,
  handleDeleteClick,
}) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteItemById(id);
      handleDeleteClick(id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    item: ToDoItem
  ) => {
    const updatedCompleted = event.target.checked;
    try {
      await updateItemCompletion(item.id, updatedCompleted);
      const updatedTodoItems = todoItems.map((todo) =>
        todo.id === item.id ? { ...todo, completed: updatedCompleted } : todo
      );
      setTodoItems(updatedTodoItems);
    } catch (error) {
      console.error("Error updating item completion:", error);
    }
  };

  return (
    <List>
      {todoItems.map((item) => (
        <ListItem key={item.id} alignItems="flex-start">
          <Checkbox
            checked={item.completed}
            onChange={(event) => handleCheckboxChange(event, item)}
          />
          <ListItemText
            primary={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  {item.title}
                </Typography>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEditClick(item);
                  }}
                  aria-label="edit"
                >
                  <EditNoteOutlined />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(item.id);
                  }}
                  aria-label="delete"
                >
                  <ClearIcon />
                </IconButton>
              </div>
            }
            secondary={
              <Typography
                variant="body2"
                component="div"
                sx={{ opacity: 0.7, width: "100%", wordWrap: "break-word" }}
                onClick={() => toggleExpandedItemId(item.id)}
                style={{ cursor: "pointer" }}
              >
                {expandedItemId === item.id ? (
                  item.description
                ) : item.description.length > 50 ? (
                  <>
                    {item.description.substring(0, 50)}
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleExpandedItemId(item.id);
                      }}
                      style={{ padding: 0, marginLeft: 4 }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    {item.description}
                    {expandedItemId === item.id && (
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleExpandedItemId(item.id);
                        }}
                        style={{ padding: 0, marginLeft: 4 }}
                      >
                        <ExpandLessIcon />
                      </IconButton>
                    )}
                  </>
                )}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ListItemComponent;
