import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { githubUserSchema, githubRepoSchema, githubStorySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;
  
  const githubApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` }),
    },
  });

  // Fetch GitHub story data
  app.get("/api/github/:username", async (req, res) => {
    try {
      const { username } = req.params;
      
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }

      let user, repos;

      if (GITHUB_TOKEN) {
        // Fetch real data with token
        const userResponse = await githubApi.get(`/users/${username}`);
        user = githubUserSchema.parse(userResponse.data);

        const reposResponse = await githubApi.get(`/users/${username}/repos`, {
          params: { per_page: 100, sort: 'updated' }
        });
        repos = reposResponse.data.map((repo: any) => githubRepoSchema.parse(repo));
      } else {
        // Without token, we need proper authentication to access GitHub API
        throw new Error("GitHub token required for API access");
      }

      // Calculate stats
      const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
      const totalForks = repos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);
      
      // Get top 5 repos by stars
      const topRepos = repos
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

      // Fetch language data for a limited number of repos to avoid rate limits
      const languageStats = new Map<string, number>();
      const reposToProcess = repos.slice(0, GITHUB_TOKEN ? 20 : 5); // Fewer repos without token
      
      for (const repo of reposToProcess) {
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
      let languages = Array.from(languageStats.entries())
        .map(([name, bytes]) => ({
          name,
          bytes,
          percentage: Math.round((bytes / totalBytes) * 100 * 10) / 10,
        }))
        .sort((a, b) => b.bytes - a.bytes)
        .slice(0, 8);

      // If no language data was fetched, create basic stats from repo languages
      if (languages.length === 0) {
        const repoLanguages = repos
          .filter((repo: any) => repo.language)
          .map((repo: any) => repo.language as string);
        
        const langCounts = new Map<string, number>();
        repoLanguages.forEach((lang: string) => {
          langCounts.set(lang, (langCounts.get(lang) || 0) + 1);
        });

        const totalRepos = repoLanguages.length;
        languages = Array.from(langCounts.entries())
          .map(([name, count]) => ({
            name,
            bytes: count * 1000, // Mock bytes for display
            percentage: Math.round((count / totalRepos) * 100 * 10) / 10,
          }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 8);
      }

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
      
      if (error.message === "GitHub token required for API access") {
        return res.status(401).json({ 
          error: "GitHub token required. Please add your GitHub Personal Access Token to fetch real data." 
        });
      }
      
      if (error.response?.status === 404) {
        return res.status(404).json({ error: "GitHub user not found" });
      }
      
      if (error.response?.status === 403 || error.response?.status === 401) {
        return res.status(401).json({ 
          error: "GitHub token required. Please add your GitHub Personal Access Token to access the API." 
        });
      }
      
      res.status(500).json({ error: "Failed to fetch GitHub data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
