import axios from "axios";
import type { AxiosInstance } from 'axios';

export const githubConnect: AxiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'User-Agent': 'Public-Git-Service'
    }
})