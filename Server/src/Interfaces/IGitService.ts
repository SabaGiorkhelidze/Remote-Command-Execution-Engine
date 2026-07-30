import { Commit, Repo } from "../types/gitTypes";

export interface IGitService {
  fetchGitReposForUser(username: string): Promise<Repo[]>;
  fetchCommitsForRepo(owner: string, repoName: string, limit?: number): Promise<Commit[]>;
}
