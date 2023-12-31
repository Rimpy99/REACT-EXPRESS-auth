import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { tokenVerification } from "./middleware/tokenVerification";
import { updateUserPicture } from './controllers/user';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet({crossOriginResourcePolicy: false,}))
app.use(cors())
app.use(express.static('public'));
app.use('/images', express.static('images'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const PORT = process.env.PORT || 6001;
const DB_LINK = process.env.DB_LINK;

app.put('/user/:id/updateUserPicture', tokenVerification, upload.single('picture'), updateUserPicture);

app.use('/auth', authRoutes);
app.use('/user', tokenVerification, userRoutes);

mongoose.connect(DB_LINK).then(() => {
    app.listen(PORT, () => {
        console.log(`server listening...`)
    })
}).catch((err) => console.log(err));