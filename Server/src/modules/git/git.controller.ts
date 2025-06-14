import { Request, Response } from "express";

import { fetchGitReposForUser, fetchCommitsForRepo } from "./git.service";



export const gitController = async (request: Request, response: Response): Promise<any> => {
    const username = request.query.user?.toString();
    const repositorie = request.query.repo // optional for commit listing (future addition)

    if (typeof username !== 'string') {
        return response.status(400).json({ error: 'Missing or invalid ?user=username param' });
    }



    try {
        const repositories = await fetchGitReposForUser(username)
        const result = [];

        for (const repo of repositories) {
            if (repositorie && repo.name !== repositorie) continue

            const commits = await fetchCommitsForRepo(username, repo.name)
            for (const commit of commits) {
                result.push({
                    repo: repo.name,
                    sha: commit.sha,
                    message: commit.commit.message,
                    url: commit.html_url,
                });
            }

        }

        return response.status(200).json({ success: true, result: result });
    } catch (error: any) {
        return response.status(500).json({ error: error.message })
    }
} 