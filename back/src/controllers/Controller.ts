import { Request, Response } from "express";
import {
  getAllItems,
  getItemById,
  addItem,
  deleteItemById,
  deleteAllItems,
  updateItemById,
} from "../../dynamo";
import ToDoItem from "../models/ToDoItem";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const item = await getItemById(id);
    res.status(200).json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const item: ToDoItem = req.body;
    await addItem(item);
    res.status(200).json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id, title, description, completed } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const result = await updateItemById(id, { title, description, completed });
    res.status(200).json({ message: "Item updated successfully", result });
  } catch (error) {
    console.error("Error updating item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the item" });
  }
};

export const deleteToDoById = async (req: Request, res: Response) => {
  console.log(req.params.id);
  console.log(typeof req.params.id);
  try {
    const id = req.params.id;
    await deleteItemById(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAllItemsController = async (req: Request, res: Response) => {
  try {
    await deleteAllItems();
    res.status(200).json({ message: "All items deleted successfully" });
  } catch (error) {
    console.error("Error deleting all items:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting all items" });
  }
};
