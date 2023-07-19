"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerification = void 0;
// import { getUserAuthInfoRequest } from "../types/reqType";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenVerification = (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token)
            return res.status(403).json({ message: "Access denied" });
        if (token.startsWith('Bearer ')) {
            // token = token.split(' ')[1];
            token = token.slice(7, token.length).trimLeft();
        }
        console.log(token);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({ error: err.message });
    }
};
exports.tokenVerification = tokenVerification;
