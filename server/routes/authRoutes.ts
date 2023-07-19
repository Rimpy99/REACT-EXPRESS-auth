import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db_schemas/User';

const router = express.Router();

const register = async (req: Request, res: Response) => {
    try{
        const { firstName, lastName, userName, email, password, country, dateOfBirth, photo } = req.body;
        console.log(req.body)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            firstName, 
            lastName, 
            userName, 
            email, 
            password: hashedPassword, 
            country, 
            dateOfBirth,
            photo
        });

        const createdUser = await user.save();

        res.status(201).json(createdUser);
    }catch(err){
        if (err instanceof Error) res.status(500).json({ error: err.message })
    }
};

const login = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email: email })
        
        if (!user) {
            res.status(400).json({ message: "Invalid email." });
            return;
        }
        
        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (!isPasswordMatching) {
            res.status(400).json({ message: "Invalid password." });
            return;
        }
        
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        const userId = user._id;

        res.status(200).json({ token, userId });
    }catch(err){
        if (err instanceof Error) res.status(500).json({ error: err.message })
    }
};

router.post('/register', register);
router.post('/login', login);

export default router;