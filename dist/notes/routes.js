"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const express_1 = require("express");
const fetchuser_1 = __importDefault(require("../middleware/fetchuser"));
const notesRoutes = (0, express_1.Router)();
notesRoutes.get('/getNotes', fetchuser_1.default, controller_1.controller.getNotes);
notesRoutes.post('/addNotes', fetchuser_1.default, controller_1.controller.addNotes);
notesRoutes.put('/updateNotes/:id', fetchuser_1.default, controller_1.controller.updateNote);
notesRoutes.delete('/deleteNotes/:id', fetchuser_1.default, controller_1.controller.deleteNote);
exports.default = notesRoutes;
