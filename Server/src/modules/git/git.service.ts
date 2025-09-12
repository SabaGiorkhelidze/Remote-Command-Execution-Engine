import { Commit, Repo } from "../../types/gitTypes";
import { githubConnect } from "../../utils/axiosHelper";

export class GitService {
  async fetchGitReposForUser(username: string): Promise<Repo[]> {
    try {
      const res = await githubConnect.get(`/users/${username}/repos`);
      return res.data;
    } catch (error: any) {
      throw new Error(
        `Failed to fetch repositories for user ${username}: ${error.message}`
      );
    }
  }

  async fetchCommitsForRepo(
    owner: string,
    repoName: string,
    limit: number = 5
  ): Promise<Commit[]> {
    try {
      const res = await githubConnect.get(
        `/repos/${owner}/${repoName}/commits`,
        { params: { per_page: limit } }
      );
      return res.data;
    } catch (error: any) {
      throw new Error(
        `Failed to fetch commits for repository ${repoName}: ${error.message}`
      );
    }
  }
}
