import express from 'express';
import * as UserController from '../controllers/UserController.js';
import {registerValidation, loginValidation} from '../utils/validations.js';
import checkAuth from '../middlewares/checkAuth.js';

const userRouter = express.Router();

userRouter.post("/login", loginValidation, UserController.login);
userRouter.post("/register",registerValidation, UserController.register);
userRouter.get("/me", checkAuth, UserController.getMe);

export default userRouter;