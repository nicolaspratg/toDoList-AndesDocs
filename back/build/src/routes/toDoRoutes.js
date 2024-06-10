"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = require("../controllers/Controller");
const router = express_1.default.Router();
router.get('/todos', Controller_1.getTodos);
router.get('/todos/:id', Controller_1.getTodo);
router.post('/todos', Controller_1.createOrUpdateTodo);
router.delete('/todos/:id', Controller_1.removeTodo);
exports.default = router;
