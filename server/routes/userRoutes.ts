import express , { Request, Response } from "express";
import User from "../db_schemas/User";

const router = express.Router();

const getUser = async (req: Request, res: Response) => {
    try{
        const { id } = req.params; 
        
        const user = await User.findById(id);

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
        }

        res.status(200).json(userInfoToSend);
    } catch(err){
        if (err instanceof Error) return res.status(404).json({ message: err.message});
    }
}

const updateUser = async (req: Request, res: Response) => {
    try{
        console.log('update dziala')
        const { id } = req.params;
        const updatedValues = req.body;

        const result = await User.findByIdAndUpdate(id, updatedValues, { new: true });
        res.status(200).json(result);
    }catch(err){
        if (err instanceof Error) return res.status(404).json({ message: err.message});
    }
}

router.get('/:id', getUser);
router.put('/:id/update', updateUser);

export default router;