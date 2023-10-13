import express from 'express';

import * as UserController from '../controllers/UserController.js';
import {registerValidation, loginValidation} from '../utils/validations.js';
import checkAuth from '../middlewares/checkAuth.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const userRouter = express.Router();

userRouter.post("/login", loginValidation, handleValidationErrors, UserController.login);
userRouter.post("/register", registerValidation, handleValidationErrors, UserController.register);
userRouter.get("/me", checkAuth, UserController.getMe);

export default userRouter;