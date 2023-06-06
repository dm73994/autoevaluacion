import { JwtPayload } from "jsonwebtoken";
import { tokeInfo } from "../models/User";
import { verifyToken } from "../utils/tokenManagment";

export const checkAuth = async(req, res, next) => {
    console.log(req.headers)
    // const token = req.headers.authorization.split(' ').pop();
    // const tokenData: JwtPayload | string = await verifyToken(token);

    // console.log(tokenData);
    // console.log(token);

    next();
}