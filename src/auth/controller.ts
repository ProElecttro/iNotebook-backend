import { validationResult } from "express-validator";
import { AppDataSource } from "../config";
import { User } from "../entities/user";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import dotenv from 'dotenv'
dotenv.config()

const userRepo = AppDataSource.getRepository(User);

const login = async (req: any, res: any) => {
    let success = false;

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    const user = await userRepo.findOne({
        where: { email: req.body.email }
    })

    if (!user) {
        return res.status(400).send({ error: "User not found, please register" })
    }

    const matchPassword = bcrypt.compare(user.password, req.body.password)

    if (!matchPassword) {
        res.status(400).send({ error: "Invalid Credentials" })
    }

    try {

        const payload = {
            user: {
                id: user.user_id,
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "2h" });

        success = true
        res.status(200).json({ success, token })
    } catch (error) {
        res.status(400).json({ success, error })
    }
}

const signup = async (req: any, res: any) => {
    let success = false

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    const user = await userRepo.findOne({
        where: { email: req.body.email }
    })

    if (user) {
        return res.status(400).send({ error: "User already exist, please login" })
    }

    try {
        let user = new User()

        user = { ...req.body }
        user.password = await bcrypt.hash(user.password, 12)
        const savedUser = await userRepo.save(user)

        const payload = {
            user: {
                id: savedUser.user_id,
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "2h" });
        success = true;

        res.status(200).json({ success, token })
    } catch (error) {
        res.status(400).json({ success, error })
    }
}

export const controller = {
    login,
    signup,
}
