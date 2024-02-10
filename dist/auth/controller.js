"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const express_validator_1 = require("express-validator");
const config_1 = require("../config");
const user_1 = require("../entities/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRepo = config_1.AppDataSource.getRepository(user_1.User);
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const user = yield userRepo.findOne({
        where: { email: req.body.email }
    });
    if (!user) {
        return res.status(400).send({ error: "User not found, please register" });
    }
    const matchPassword = bcrypt_1.default.compare(user.password, req.body.password);
    if (!matchPassword) {
        res.status(400).send({ error: "Invalid Credentials" });
    }
    try {
        const payload = {
            user: {
                id: user.user_id,
            }
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
        success = true;
        res.status(200).json({ success, token });
    }
    catch (error) {
        res.status(400).json({ success, error });
    }
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const user = yield userRepo.findOne({
        where: { email: req.body.email }
    });
    if (user) {
        return res.status(400).send({ error: "User already exist, please login" });
    }
    try {
        let user = new user_1.User();
        user = Object.assign({}, req.body);
        user.password = yield bcrypt_1.default.hash(user.password, 12);
        const savedUser = yield userRepo.save(user);
        const payload = {
            user: {
                id: savedUser.user_id,
            }
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
        success = true;
        res.status(200).json({ success, token });
    }
    catch (error) {
        res.status(400).json({ success, error });
    }
});
exports.controller = {
    login,
    signup,
};
