import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./user"

// Note entity
@Entity({ name: "Note" })
export class Note {
    @PrimaryGeneratedColumn("uuid")
    notes_id: string; // Change the type to string

    @Column()
    title: string;

    @Column()
    tags: string;

    @Column()
    text: string;

    @ManyToOne(type => User, user => user.notes)
    user: User;
}
