import { z } from "zod";

// GitHub User Schema
export const githubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  location: z.string().nullable(),
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(),
});

// GitHub Repository Schema
export const githubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  updated_at: z.string(),
  languages_url: z.string(),
});

// Language Statistics Schema
export const languageStatsSchema = z.object({
  name: z.string(),
  bytes: z.number(),
  percentage: z.number(),
});

// Commit Activity Schema
export const commitActivitySchema = z.object({
  dayOfWeek: z.number(), // 0-6 (Sunday-Saturday)
  hour: z.number(), // 0-23
  count: z.number(),
});

// Processed GitHub Story Data Schema
export const githubStorySchema = z.object({
  user: githubUserSchema,
  stats: z.object({
    public_repos: z.number(),
    total_stars: z.number(),
    total_forks: z.number(),
    languages_count: z.number(),
  }),
  topRepos: z.array(githubRepoSchema).max(5),
  languages: z.array(languageStatsSchema),
  commitActivity: z.object({
    byDay: z.array(z.object({
      day: z.string(),
      count: z.number(),
    })),
    byHour: z.array(z.object({
      hour: z.number(),
      count: z.number(),
    })),
  }),
});

export type GitHubUser = z.infer<typeof githubUserSchema>;
export type GitHubRepo = z.infer<typeof githubRepoSchema>;
export type LanguageStats = z.infer<typeof languageStatsSchema>;
export type CommitActivity = z.infer<typeof commitActivitySchema>;
export type GitHubStory = z.infer<typeof githubStorySchema>;
