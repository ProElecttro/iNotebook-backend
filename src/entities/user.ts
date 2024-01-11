import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity({name: "User"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id: string

    @Column()
    email!: string

    @Column()
    password!: string
}