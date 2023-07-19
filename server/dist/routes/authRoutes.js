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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../db_schemas/User"));
const router = express_1.default.Router();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, userName, email, password, country, dateOfBirth, photo } = req.body;
        console.log(req.body);
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = new User_1.default({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            country,
            dateOfBirth,
            photo
        });
        const createdUser = yield user.save();
        res.status(201).json(createdUser);
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({ error: err.message });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            res.status(400).json({ message: "Invalid email." });
            return;
        }
        const isPasswordMatching = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatching) {
            res.status(400).json({ message: "Invalid password." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
        const userId = user._id;
        res.status(200).json({ token, userId });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({ error: err.message });
    }
});
router.post('/register', register);
router.post('/login', login);
exports.default = router;
