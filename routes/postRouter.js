import express from 'express';

import * as PostController from '../controllers/PostController.js';
import {postValidation} from '../utils/validations.js';
import checkAuth from '../middlewares/checkAuth.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const postRouter = express.Router();

postRouter.get("/", PostController.getAll);
postRouter.get("/tags/", PostController.getTags);
postRouter.get("/:id", PostController.getOne);
postRouter.post("/", checkAuth, postValidation, handleValidationErrors, PostController.create);
postRouter.delete("/:id", checkAuth, PostController.remove);
postRouter.patch("/:id", checkAuth, postValidation, handleValidationErrors, PostController.update);

export default postRouter;