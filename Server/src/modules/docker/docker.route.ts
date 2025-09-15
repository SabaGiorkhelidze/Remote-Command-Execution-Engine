import { Router } from "express";
import { DockerController } from "./docker.controller";

const dockerRouter = Router()

const dockerController = new DockerController()

dockerRouter.post("/start-container", dockerController.startContainerController)
dockerRouter.get('/get-containers', dockerController.getAllContainerController)
dockerRouter.get('/get-container/:id', dockerController.getContainerByIdController)

export default dockerRouter