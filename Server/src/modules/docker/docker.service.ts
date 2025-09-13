import Docker from "dockerode";
import { normalizePorts } from "../../utils/normilizePorts";
import { ensureImage } from "../../utils/dockerImageChecker";

export class DockerService {
  private docker: Docker;

  constructor() {
    this.docker = new Docker();
  }

  async startContainer(image: string, name: string, cmd?: string[], ports?: Record<string, string>) {
    const portBindings = normalizePorts(ports);

    await ensureImage(this.docker, image);

    const container = this.docker.createContainer({
      Image: image,
      name: name,
      Cmd: cmd,
      HostConfig: {
        PortBindings: portBindings,
      },
    });
    
    (await container).start();

    return container;
  }
}
