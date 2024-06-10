import { BACKEND_URL } from "../config/config";

export const deleteItemById = async (id: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/deleteItemById/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
