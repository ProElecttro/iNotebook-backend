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
exports.controller = void 0;
const config_1 = require("../config");
const notes_1 = require("../entities/notes");
const user_1 = require("../entities/user");
const notesRepo = config_1.AppDataSource.getRepository(notes_1.Note);
const userRepo = config_1.AppDataSource.getRepository(user_1.User);
const addNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user.id;
    let note = new notes_1.Note();
    req.user.id = user_id;
    note = Object.assign({}, req.body);
    const user = yield userRepo.findOne({
        where: { user_id: user_id },
        select: ["email", "user_id"]
    });
    if (!user) {
        return res.json({ error: "User not found" });
    }
    note.user = user;
    const savedNote = yield notesRepo.save(note);
    res.status(201).json({ savedNote });
});
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user.id;
    const notes = yield notesRepo.find({
        where: { user: { user_id } }
    });
    if (!notes) {
        res.status(400).json({ message: "Note not found" });
    }
    res.status(200).send({ notes });
});
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield notesRepo.findOne({
            where: { notes_id: req.params.id },
            relations: {
                user: true
            }
        });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        if (note.user.user_id !== req.user.id) {
            return res.status(403).json({ error: "Not Allowed" });
        }
        const newNote = new notes_1.Note();
        newNote.description = req.body.description || note.description;
        newNote.title = req.body.title || note.title;
        newNote.tags = req.body.tags;
        yield notesRepo.update(note.notes_id, newNote);
        res.status(200).json({ message: "Note updated" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield notesRepo.findOne({
        where: { notes_id: req.params.id },
        relations: {
            user: true
        }
    });
    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }
    if (note.user.user_id !== req.user.id) {
        return res.status(403).json({ error: "Not Allowed" });
    }
    yield notesRepo.delete(note.notes_id);
    res.status(200).json({ message: "Note deleted successfully" });
});
exports.controller = {
    addNotes,
    getNotes,
    updateNote,
    deleteNote
};
