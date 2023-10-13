import express from 'express';
import * as PostController from '../controllers/PostController.js';
import {postCreateValidation} from '../utils/validations.js';
import checkAuth from '../middlewares/checkAuth.js';

const postRouter = express.Router();

postRouter.get("/", checkAuth, PostController.getAll);
postRouter.get("/:id", PostController.getOne);
postRouter.post("/", checkAuth, postCreateValidation, PostController.create);
postRouter.delete("/:id", checkAuth, PostController.remove);
postRouter.patch("/:id", checkAuth, PostController.update);

export default postRouter;