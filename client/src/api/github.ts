import axios from 'axios';
import type { GitHubStory } from '@shared/schema';

const api = axios.create({
  baseURL: '/api',
});

export const fetchGitHubStory = async (username: string): Promise<GitHubStory> => {
  const response = await api.get(`/github/${username}`);
  return response.data;
};

export default api;
