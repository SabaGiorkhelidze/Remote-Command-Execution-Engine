import { Router } from "express";
import { GitController } from "./git.controller";

const gitRouter = Router()
const gitController =  new GitController();

gitRouter.get('/gitRepos', gitController.runGitService)

export default gitRouter