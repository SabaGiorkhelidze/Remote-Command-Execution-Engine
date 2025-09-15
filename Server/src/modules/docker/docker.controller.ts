import { DockerService } from "./docker.service";
import { Request, Response } from "express";
import { startContainerTypes } from "../../types/dockerTypes";

export class DockerController {
  private dockerService: DockerService;

  constructor() {
    this.dockerService = new DockerService();
  }

  startContainerController = async (request: Request, response: Response) => {
    const { container, image, cmd, ports } =
      request.body as startContainerTypes;

    try {
      const created = await this.dockerService.startContainer(
        image,
        container,
        cmd,
        ports
      );
      response.json({ message: "Container started", id: created.id });
    } catch (err) {
      console.error(err);
      response.status(500).json({ error: "Failed to start container" });
    }
  };

  getAllContainerController = async (request: Request, response: Response) => {
    try {
      const listOfContainers = await this.dockerService.getAllContainers();
      response.status(200).json({ success: true, listOfContainers });
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: `Failed to fetch containers, with error ${error}` });
    }
  };

  getContainerByIdController = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
      const containerInfo = await this.dockerService.getContainerById(id);
      response.status(200).json({ success: true, containerInfo });
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: `error while fetching container, error ${error}` });
    }
  };
}
