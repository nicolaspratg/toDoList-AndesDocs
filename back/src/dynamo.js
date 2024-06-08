const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB();
const TABLE_NAME = "to-do-list-AndesDocs";

const getAllItems = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const data = await dynamoClient.scan(params).promise();
  console.log(data);
  return data.Items;
};
const getItemById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
  };
  return await dynamoClient.get(params).promise();
};

const addOrUpdateItem = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };
  return await dynamoClient.put(params).promise();
};

const deleteItem = async (id) => {
  console.log(`Deleting item with id: ${id}`);

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: {
        S: id.toString(),
      },
    },
  };

  try {
    const result = await dynamoClient.deleteItem(params).promise();
    console.log("Delete result:", result);
    return result;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

module.exports = {
  dynamoClient,
  getAllItems,
  getItemById,
  addOrUpdateItem,
  deleteItem,
};