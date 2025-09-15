import Docker from "dockerode";
import { normalizePorts } from "../../utils/normilizePorts";
import { ensureImage } from "../../utils/dockerImageChecker";

export class DockerService {
  private docker: Docker;

  constructor() {
    this.docker = new Docker();
  }

  async startContainer(
    image: string,
    name: string,
    cmd?: string[],
    ports?: Record<string, string>
  ) {
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

  async getAllContainers() {
    const infos = await this.docker.listContainers({ all: true });
    return infos.map((i) => ({
      id: i.Id,
      names: i.Names,
      image: i.Image,
      state: i.State,
      status: i.Status,
      ports: i.Ports,
      // labels: i.Labels,
    }));
  }
  async getContainerById(id: string) {
    if (!id) throw new Error("Container ID is required");

    const container = this.docker.getContainer(id);
    const info = await container.inspect();
    return info;
  }
}
