import { BACKEND_URL } from "../config/config";
import TodoItem from "../types";

export const addOrUpdateItem = async (item: TodoItem): Promise<TodoItem> => {
  try {
    const response = await fetch(`${BACKEND_URL}/addToDo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to add or update to-do item");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding or updating to-do item:", error);
    throw error;
  }
};

