import { BACKEND_URL } from "../config/config";

export const deleteAllItems = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/deleteAllItems`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete all items");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting all items:", error);
    throw error;
  }
};
