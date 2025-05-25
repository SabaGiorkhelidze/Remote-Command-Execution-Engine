import axios from "axios";
import { githubConnect } from "../../utils/axiosHelper";

export const fetchGitReposForUser = async (username: string): Promise<any[]> => {
    const res = await githubConnect.get(`/users/${username}/repos`)

    return res.data
}


export const fetchCommitsForRepo = async (owner: string, repoName: string, limit: number=5) => {
    const res = await githubConnect.get(`/repos/${owner}/${repoName}/commits`, {
        params: {per_page: limit}
    })

    return res.data
}