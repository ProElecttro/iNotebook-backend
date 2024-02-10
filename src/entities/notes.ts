import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm"
import { User } from "./user"

// Note entity
@Entity({ name: "Note" })
export class Note {
    @PrimaryGeneratedColumn("uuid")
    notes_id: string;

    @Column()
    title: string;

    @Column()
    tags: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.notes)
    user: User;
}
