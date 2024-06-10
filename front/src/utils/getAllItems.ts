import { BACKEND_URL } from "../config/config";
import ToDoItem from "../types";

export const getAllItems = async (): Promise<ToDoItem[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch to-do items");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching to-do items:", error);
    throw error;
  }
};
