import Docker from "dockerode";

import { AppDataSource } from "./config/data-source";
import { CommandExecutionLog } from "./Entity/CommandExecutionLog";

import { HistoryService } from "./modules/History/history.service";

import { CommandService } from "./modules/Command/command.service";
import { CommandController } from "./modules/Command/command.controller";

import { DockerService } from "./modules/docker/docker.service";
import { DockerController } from "./modules/docker/docker.controller";

import { GitService } from "./modules/git/git.service";
import { GitController } from "./modules/git/git.controller";



const historyService = new HistoryService(AppDataSource.getRepository(CommandExecutionLog));

const commandService = new CommandService(historyService);
export const commandController = new CommandController(commandService);

const dockerService = new DockerService(new Docker());
export const dockerController = new DockerController(dockerService);

const gitService = new GitService();
export const gitController = new GitController(gitService);

export { historyService };