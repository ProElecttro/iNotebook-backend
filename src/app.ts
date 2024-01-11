import "reflect-metadata";

import { AppDataSource } from "./config";

import authRoutes from "./auth/routes";

import express from 'express'
const app = express();
app.use(express.json())

app.use("/api/v1/auth", authRoutes);



const port = 4000;

AppDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`listening on ${port}`)
    });
}).catch((error) => {
    console.log(`Error: ${error}`)
})
