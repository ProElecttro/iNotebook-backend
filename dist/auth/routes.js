"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const controller_1 = require("./controller");
const authRoutes = (0, express_1.Router)();
const validationRules = [
    (0, express_validator_1.check)('email').notEmpty().isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.check)('password')
        .notEmpty().withMessage('Password cannot be empty')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
authRoutes.post('/login', validationRules, controller_1.controller.login);
authRoutes.post('/signup', validationRules, controller_1.controller.signup);
exports.default = authRoutes;
