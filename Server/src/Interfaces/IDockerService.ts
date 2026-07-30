import Docker from "dockerode";

export interface ContainerSummary {
  id: string;
  names: string[];
  image: string;
  state: string;
  status: string;
  ports: Docker.Port[];
}

export interface IDockerService {
  startContainer(
    image: string,
    name: string,
    cmd?: string[],
    ports?: Record<string, string>
  ): Promise<Docker.Container>;
  getAllContainers(): Promise<ContainerSummary[]>;
  getContainerById(id: string): Promise<Docker.ContainerInspectInfo>;
  getLogsFromContainerById(id: string, writeFile?: boolean): Promise<any>;
}
