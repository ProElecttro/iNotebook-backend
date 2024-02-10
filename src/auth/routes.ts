import { check, ValidationChain } from 'express-validator';
import { Router } from "express";
import { controller } from "./controller";
import fetchuser from '../middleware/fetchuser';

const authRoutes = Router();

const validationRules: ValidationChain[] = [
    check('email').notEmpty().isEmail().withMessage('Invalid email format'),
    check('password')
        .notEmpty().withMessage('Password cannot be empty')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

authRoutes.post('/login', validationRules, controller.login);
authRoutes.post('/signup', validationRules, controller.signup);

export default authRoutes;
