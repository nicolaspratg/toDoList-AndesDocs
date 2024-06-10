"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemById = exports.addOrUpdateItem = exports.getItemById = exports.getAllItems = exports.dynamoClient = void 0;
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, DeleteCommand, } = require("@aws-sdk/lib-dynamodb");
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
exports.dynamoClient = dynamoClient;
const TABLE_NAME = "to-do-list-AndesDocs";
const getAllItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: TABLE_NAME,
    };
    const data = yield dynamoClient.send(new ScanCommand(params));
    console.log(data);
    return data.Items;
});
exports.getAllItems = getAllItems;
const getItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: { N: id.toString() },
        },
    };
    return yield dynamoClient.send(new GetCommand(params));
});
exports.getItemById = getItemById;
const addOrUpdateItem = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: TABLE_NAME,
        Item: item,
    };
    return yield dynamoClient.send(new PutCommand(params));
});
exports.addOrUpdateItem = addOrUpdateItem;
const deleteItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Deleting item with id: ${id}`);
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: { N: id.toString() },
        },
    };
    try {
        const result = yield dynamoClient.send(new DeleteCommand(params));
        console.log("Delete result:", result);
        return result;
    }
    catch (error) {
        console.error("Error deleting item:", error);
        throw error;
    }
});
exports.deleteItemById = deleteItemById;
