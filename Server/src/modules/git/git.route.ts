import { Router } from "express";
import { gitController } from "../../container";

const gitRouter = Router();

gitRouter.get('/gitRepos', gitController.runGitService);

export default gitRouter;