import { ReturnValue } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

const REGION = process.env.AWS_DEFAULT_REGION;
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const client = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const dynamoClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME: string = "to-do-list-AndesDocs";

const getAllItems = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const data = await dynamoClient.send(new ScanCommand(params));
  console.log(data);
  return data.Items;
};

const getItemById = async (id: number) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: { N: id.toString() },
    },
  };
  return await dynamoClient.send(new GetCommand(params));
};

const addItem = async (item: any) => {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };
  return await dynamoClient.send(new PutCommand(params));
};

const updateItemById = async (
  id: string,
  updates: { title?: string; description?: string; completed?: boolean }
) => {
  console.log(`Updating item with id: ${id}`);

  let updateExpression = "set ";
  const expressionAttributeValues: any = {};

  if (updates.title !== undefined) {
    updateExpression += "title = :t, ";
    expressionAttributeValues[":t"] = updates.title;
  }
  if (updates.description !== undefined) {
    updateExpression += "description = :d, ";
    expressionAttributeValues[":d"] = updates.description;
  }
  if (updates.completed !== undefined) {
    updateExpression += "completed = :c, ";
    expressionAttributeValues[":c"] = updates.completed;
  }

  updateExpression = updateExpression.slice(0, -2);

  const params: UpdateCommandInput = {
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: ReturnValue.UPDATED_NEW,
  };

  try {
    const result = await dynamoClient.send(new UpdateCommand(params));
    console.log("Update result:", result);
    return result;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

const deleteItemById = async (id: string) => {
  console.log(`Deleting item with id: ${id}`);

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
  };

  try {
    const result = await dynamoClient.send(new DeleteCommand(params));
    console.log("Delete result:", result);
    return result;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

const deleteAllItems = async () => {
  try {
    const items = await getAllItems();

    const deletePromises = items.map(async (item: any) => {
      await deleteItemById(item.id);
    });

    await Promise.all(deletePromises);

    console.log("All items deleted successfully");
  } catch (error) {
    console.error("Error deleting items:", error);
    throw error;
  }
};

export {
  dynamoClient,
  getAllItems,
  getItemById,
  addItem,
  deleteItemById,
  deleteAllItems,
  updateItemById,
};
