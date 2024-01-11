import { controller } from "./controller";
import { Router } from "express";

import fetchuser from '../middleware/fetchuser';

const notesRoutes = Router();

notesRoutes.get('/getNotes', fetchuser, controller.getNotes);
notesRoutes.post('/addNotes', fetchuser, controller.addNotes);
notesRoutes.put('/updateNotes/:id', fetchuser, controller.updateNote);
notesRoutes.delete('/deleteNotes/:id', fetchuser, controller.deleteNote);

export default notesRoutes;
