import { Router } from "express";
import { gitController } from "./git.controller";

const gitRouter = Router()

gitRouter.get('/gitRepos', gitController)

export default gitRouter