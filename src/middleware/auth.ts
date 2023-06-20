import { JwtPayload } from "jsonwebtoken";
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

export const checkUserAccess = (allowedUser) => {
  return (req, res, next) => {
    const user = req.session.role;
    if (user === allowedUser) {
      next();
    } else {
      res.render('error');
    }
  };
};