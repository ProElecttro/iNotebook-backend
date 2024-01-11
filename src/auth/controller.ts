import { validationResult } from "express-validator";
import { AppDataSource } from "../config";
import { User } from "../entities/user";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import dotenv from 'dotenv'
dotenv.config()

const userRepo = AppDataSource.getRepository(User);

const login = async (req:any, res:any) => {
    return res.send("Login route");
}

const signup = async (req:any, res:any) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    const user = await userRepo.findOne({
        where: { email: req.body.email }
    })

    if( user ){
        return res.status(400).send({ error: "User already exist, please login" })
    }

    try {
        let user = new User()

        user = {...req.body}
        user.password = await bcrypt.hash(user.password, 12)
        const savedUser = await userRepo.save(user)

        const payload = {
            user: {
                id: savedUser.user_id,
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "2h" });
        res.status(200).json({ token })
    } catch (error) {
        res.status(400).json({ error: error})
    }
}

const getuserData = async (req: any, res: any) => {
    const user_id = req.user.id;

    try {
        const user = await userRepo.findOne({
            where: { user_id: user_id },
            select: ["email", "user_id"],
        });

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const controller = {
    login,
    signup,
    getuserData
}
