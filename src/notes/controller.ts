import { AppDataSource } from "../config";
import { Note } from "../entities/notes";
import { User } from "../entities/user";

const notesRepo = AppDataSource.getRepository(Note)
const userRepo = AppDataSource.getRepository(User)

const addNotes = async(req:any, res:any) => {
    const user_id = req.user.id;

    let note = new Note()
    req.user.id = user_id

    note = {...req.body}

    const user = await userRepo.findOne({
        where: { user_id: user_id },
        select: [ "email", "user_id" ]
    });

    if ( !user ) {
        return res.json({ error: "User not found" });
    }

    note.user = user

    const savedNote = await notesRepo.save(note)
    res.status(201).json({savedNote})
}

const getNotes = async(req:any, res:any) => {
    const user_id = req.user.id;

    const notes = await notesRepo.find({
        where: { user: { user_id } }
    });

    if( !notes ){
        res.status(400).json({ message: "Note not found"})
    }

    res.status(200).send({ notes })
}

const updateNote = async (req: any, res: any) => {
    try {
        const note = await notesRepo.findOne({
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

        const newNote = new Note();
        newNote.description = req.body.description || note.description;
        newNote.title = req.body.title || note.title;
        newNote.tags = req.body.tags;

        await notesRepo.update(note.notes_id, newNote);

        res.status(200).json({ message: "Note updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteNote = async (req: any, res: any) => {
    const note = await notesRepo.findOne({
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

    await notesRepo.delete(note.notes_id)
    res.status(200).json({message: "Note deleted successfully"})
}


export const controller = {
    addNotes,
    getNotes,
    updateNote,
    deleteNote
}