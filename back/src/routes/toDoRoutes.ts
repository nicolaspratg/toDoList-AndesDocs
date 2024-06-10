import express from "express";
import {
  getTodos,
  getTodo,
  createTodo,
  deleteToDoById,
  deleteAllItemsController,
  updateTodo,
} from "../controllers/Controller";

const router = express.Router();

router.get("/", getTodos);
router.get("/todos/:id", getTodo);
router.post("/addToDo", createTodo);
router.put("/updateToDo", updateTodo);
router.delete("/deleteItemById/:id", deleteToDoById);
router.delete("/deleteAllItems", deleteAllItemsController);

export default router;
