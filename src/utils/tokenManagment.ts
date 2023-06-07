import { User, tokeInfo } from "../models/User";
import jwt from "jsonwebtoken"

export const tokenSign = async(user: User) => {

    const payload: tokeInfo = {
        _id: user.user_id,
        roles: user.rol
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );
}

export const verifyToken = async(token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}