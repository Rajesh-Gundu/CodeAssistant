import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { githubUserSchema, githubRepoSchema, githubStorySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;
  
  const githubApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  // Fetch GitHub story data
  app.get("/api/github/:username", async (req, res) => {
    try {
      const { username } = req.params;
      
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }

      // Fetch user data
      const userResponse = await githubApi.get(`/users/${username}`);
      const user = githubUserSchema.parse(userResponse.data);

      // Fetch repositories
      const reposResponse = await githubApi.get(`/users/${username}/repos`, {
        params: { per_page: 100, sort: 'updated' }
      });
      const repos = reposResponse.data.map((repo: any) => githubRepoSchema.parse(repo));

      // Calculate stats
      const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
      const totalForks = repos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);
      
      // Get top 5 repos by stars
      const topRepos = repos
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

      // Fetch language data for all repos
      const languageStats = new Map<string, number>();
      
      for (const repo of repos.slice(0, 20)) { // Limit to first 20 repos to avoid rate limits
        if (repo.languages_url) {
          try {
            const langResponse = await githubApi.get(repo.languages_url.replace('https://api.github.com', ''));
            const languages = langResponse.data;
            
            for (const [lang, bytes] of Object.entries(languages)) {
              languageStats.set(lang, (languageStats.get(lang) || 0) + (bytes as number));
            }
          } catch (error) {
            console.warn(`Failed to fetch languages for ${repo.name}`);
          }
        }
      }

      // Calculate language percentages
      const totalBytes = Array.from(languageStats.values()).reduce((sum, bytes) => sum + bytes, 0);
      const languages = Array.from(languageStats.entries())
        .map(([name, bytes]) => ({
          name,
          bytes,
          percentage: Math.round((bytes / totalBytes) * 100 * 10) / 10,
        }))
        .sort((a, b) => b.bytes - a.bytes)
        .slice(0, 8);

      // Generate mock commit activity data (GitHub API for commits requires more complex logic)
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const commitsByDay = days.map((day, index) => ({
        day,
        count: Math.floor(Math.random() * 50) + 10, // Mock data
      }));

      const commitsByHour = Array.from({ length: 24 }, (_, hour) => ({
        hour,
        count: Math.floor(Math.random() * 20) + 1, // Mock data
      }));

      const storyData = {
        user,
        stats: {
          public_repos: user.public_repos,
          total_stars: totalStars,
          total_forks: totalForks,
          languages_count: languages.length,
        },
        topRepos,
        languages,
        commitActivity: {
          byDay: commitsByDay,
          byHour: commitsByHour,
        },
      };

      const validatedStory = githubStorySchema.parse(storyData);
      res.json(validatedStory);

    } catch (error: any) {
      console.error('GitHub API Error:', error.message);
      
      if (error.response?.status === 404) {
        return res.status(404).json({ error: "GitHub user not found" });
      }
      
      if (error.response?.status === 403) {
        return res.status(429).json({ error: "API rate limit exceeded. Please try again later." });
      }
      
      res.status(500).json({ error: "Failed to fetch GitHub data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
