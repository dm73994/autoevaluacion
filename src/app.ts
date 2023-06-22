import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import path from 'path'; 
import { authRouter } from './routes/auth/authRoute';
import { laborRouter } from './routes/labores/laboresRoute';
import { userRouter } from './routes/users/userRoute';
import { periodoRouter } from './routes/periodoAcademico/periodRoute';
import { autoEvaluationRouter } from './routes/autoevaluacion/autoevaluacionRoute';
import { checkAuth, checkUserAccess } from './middleware/auth'; // Importa el middleware checkAuth
import {notificacionRouter} from './routes/notificaciones/notificacionesRoute';
export const app = express();

// Default configs
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}));

// Acceso a vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Acceso de imagenes y css
app.use('/resources', express.static('public'));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

// Definicion de rutas
app.use('/',authRouter);
app.use('/',checkAuth, laborRouter);
app.use('/',checkAuth,periodoRouter);
app.use('/',checkAuth,autoEvaluationRouter);
app.use('/',checkAuth,userRouter);
app.use('/',checkAuth,notificacionRouter);


