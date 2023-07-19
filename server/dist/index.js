"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const tokenVerification_1 = require("./middleware/tokenVerification");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false, }));
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
app.use('/images', express_1.default.static('images'));
const PORT = process.env.PORT || 6001;
const DB_LINK = process.env.DB_LINK;
app.use('/auth', authRoutes_1.default);
app.use('/user', tokenVerification_1.tokenVerification, userRoutes_1.default);
mongoose_1.default.connect(DB_LINK).then(() => {
    app.listen(PORT, () => {
        console.log(`server listening...`);
    });
}).catch((err) => console.log(err));
