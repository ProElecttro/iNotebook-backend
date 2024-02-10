"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const config_1 = require("./config");
const routes_1 = __importDefault(require("./auth/routes"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_2 = __importDefault(require("./notes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/auth", routes_1.default);
app.use("/api/v1/notes", routes_2.default);
const port = 4000;
config_1.AppDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`listening on ${port}`);
    });
}).catch((error) => {
    console.log(`Error: ${error}`);
});
