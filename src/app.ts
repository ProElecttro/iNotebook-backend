import "reflect-metadata";

import { AppDataSource } from "./config";

import authRoutes from "./auth/routes";

import express from 'express'
import cors from 'cors'
import notesRoutes from "./notes/routes";

const app = express();
app.use(express.json())

app.use(
    cors()
)

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", notesRoutes);

const port = 4000;

AppDataSource.initialize().then(() => {
    app.listen(port, '0.0.0.0' , () => {
        console.log(`listening on ${port}`)
    });
}).catch((error) => {
    console.log(`Error: ${error}`)
})
