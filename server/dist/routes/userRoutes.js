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
// import { getUserAuthInfoRequest } from "../types/reqType";
const User_1 = __importDefault(require("../db_schemas/User"));
const router = express_1.default.Router();
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id);
        if (!user) {
            res.status(400).json({ message: "Couldn't get user info." });
            return;
        }
        const userInfoToSend = {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            photo: user.photo,
            country: user.country,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            dateOfBirth: user.dateOfBirth,
            email: user.email,
        };
        res.status(200).json(userInfoToSend);
    }
    catch (err) {
        if (err instanceof Error)
            return res.status(404).json({ message: err.message });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('update dziala');
        const { id } = req.params;
        const updatedValues = req.body;
        const result = yield User_1.default.findByIdAndUpdate(id, updatedValues, { new: true });
        res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error)
            return res.status(404).json({ message: err.message });
    }
});
router.get('/:id', getUser);
router.put('/:id/update', updateUser);
exports.default = router;
