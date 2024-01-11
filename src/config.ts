import { DataSource } from "typeorm";
import { User } from './entities/user'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Vms@#8843",
    database: "iNotebook",
    synchronize: true,
    // logging: true,
    entities: [User],
})