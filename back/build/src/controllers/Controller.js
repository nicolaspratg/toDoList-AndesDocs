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
exports.removeTodo = exports.createOrUpdateTodo = exports.getTodo = exports.getTodos = void 0;
const dynamo_1 = require("../../dynamo");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield (0, dynamo_1.getAllItems)();
        res.status(200).json(items);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getTodos = getTodos;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const item = yield (0, dynamo_1.getItemById)(id);
        res.status(200).json(item);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getTodo = getTodo;
const createOrUpdateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = req.body;
        yield (0, dynamo_1.addOrUpdateItem)(item);
        res.status(200).json(item);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.createOrUpdateTodo = createOrUpdateTodo;
const removeTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield (0, dynamo_1.deleteItemById)(id);
        res.status(200).json({ message: "Item deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.removeTodo = removeTodo;
