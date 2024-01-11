import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { Note } from "./notes"

// User entity
@Entity({ name: "User" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @OneToMany(type => Note, note => note.user)
    notes: Note[];
}
