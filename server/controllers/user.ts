import User from "../db_schemas/User";
import { Request, Response } from "express";

export const updateUserPicture = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const { picturePath } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { photo: picturePath }, { new: true });
        console.log(updatedUser)
        res.status(200).json(updatedUser);
    }catch(err){
        if (err instanceof Error) return res.status(404).json({ message: err.message });
    }
};