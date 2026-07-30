import { Router } from "express";
import { dockerController } from "../../container";

const dockerRouter = Router();

dockerRouter.post("/start-container", dockerController.startContainerController);
dockerRouter.get('/get-containers', dockerController.getAllContainerController);
dockerRouter.get('/get-container/:id', dockerController.getContainerByIdController);

export default dockerRouter;