import { ExternalLink, Star, GitFork } from "lucide-react";
import type { GitHubRepo } from "@shared/schema";

interface TopReposProps {
  repos: GitHubRepo[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#1572B6',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
};

export default function TopRepos({ repos }: TopReposProps) {
  return (
    <div className="bg-github-secondary border border-github-border rounded-xl p-6">
      <h3 className="text-xl font-semibold text-github-text mb-4 flex items-center">
        <span className="mr-2">🏆</span>
        Top Repositories
      </h3>
      <div className="space-y-4">
        {repos.map((repo) => (
          <div key={repo.id} className="bg-github-dark border border-github-border rounded-lg p-4 hover:border-github-green transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-github-text mb-1 flex items-center">
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-github-green transition-colors flex items-center"
                  >
                    {repo.name}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </h4>
                {repo.description && (
                  <p className="text-github-text-secondary text-sm mb-3">
                    {repo.description}
                  </p>
                )}
                <div className="flex items-center space-x-4 text-sm text-github-text-secondary">
                  {repo.language && (
                    <span className="flex items-center space-x-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#8b949e' }}
                      ></div>
                      <span>{repo.language}</span>
                    </span>
                  )}
                  <span className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{repo.stargazers_count.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <GitFork className="w-4 h-4 text-blue-400" />
                    <span>{repo.forks_count.toLocaleString()}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
