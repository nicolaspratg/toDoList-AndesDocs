import { BACKEND_URL } from "../config/config";

const updateItemCompletion = async (id: string, completed: boolean) => {
  try {
    const response = await fetch(`${BACKEND_URL}/updateToDo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        completed: completed,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update item completion status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating item completion:", error);
    throw error;
  }
};

export default updateItemCompletion;
