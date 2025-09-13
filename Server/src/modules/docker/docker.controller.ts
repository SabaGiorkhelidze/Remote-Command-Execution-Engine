import { DockerService } from "./docker.service";
import { Request, Response } from "express";
import { startContainerTypes } from "../../types/dockerTypes";

export class DockerController {
  private dockerService: DockerService;

  constructor() {
    this.dockerService = new DockerService();
  }

  runDockerService = async (request: Request, response: Response) => {
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
}
