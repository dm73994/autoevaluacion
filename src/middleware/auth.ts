import { JwtPayload } from "jsonwebtoken";
import { tokeInfo } from "../models/User";
import { verifyToken } from "../utils/tokenManagment";

export const checkAuth = (req, res, next) => {
    if (req.session.loggedin) {
      next();
    } else {
        res.render('login',{
            alert:true,
            alertTitle: "Error",
            alertMessage:"Debe iniciar sesion...",
            alertIcon:"error",
            showConfirmButton:true,
            timer:false,
            ruta:'login'
        })
    }
  };