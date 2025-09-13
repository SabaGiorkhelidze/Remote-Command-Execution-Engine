import { Request, Response } from "express";
import { GitService } from "./git.service";

export class GitController {
  private gitService: GitService;

  constructor() {
    this.gitService = new GitService();
  }

  runGitService = async (request: Request, response: Response): Promise<any> => {
    const username = request.query.user?.toString();
    const repository = request.query.repo?.toString();

    if (typeof username !== "string") {
      return response
        .status(400)
        .json({ error: "Missing or invalid ?user=username param" });
    }

    try {
      const repositories = await this.gitService.fetchGitReposForUser(username);

      if (!repository) {
        return response
          .status(200)
          .json({ success: true, repositories });
      }

      const filteredRepos = repositories.filter((repo) => repo.name === repository);

      if (filteredRepos.length === 0) {
        return response
          .status(404)
          .json({ error: `Repository '${repository}' not found for user '${username}'` });
      }

      const result = await Promise.all(
        filteredRepos.map(async (repo) => {
          const commits = await this.gitService.fetchCommitsForRepo(
            username,
            repo.name
          );

          return commits.map((commit) => ({
            repo: repo.name,
            sha: commit.sha,
            message: commit.commit.message,
            url: commit.html_url,
          }));
        })
      );

      const flattenedResult = result.flat();

      return response
        .status(200)
        .json({ success: true, result: flattenedResult });
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
}