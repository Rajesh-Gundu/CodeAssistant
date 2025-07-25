import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Github } from "lucide-react";
import UsernameForm from "@/components/UsernameForm";
import StoryDisplay from "@/components/StoryDisplay";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { GitHubStory } from "@shared/schema";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data: githubStory, isLoading, error, refetch } = useQuery<GitHubStory>({
    queryKey: ["/api/github", username],
    enabled: shouldFetch && !!username,
    retry: false,
  });

  const handleUsernameSubmit = (newUsername: string) => {
    setUsername(newUsername);
    setShouldFetch(true);
  };

  const handleReset = () => {
    setUsername("");
    setShouldFetch(false);
  };

  const showForm = !shouldFetch || (!isLoading && !githubStory && error);
  const showLoading = shouldFetch && isLoading;
  const showStory = shouldFetch && !isLoading && githubStory && !error;
  const showError = shouldFetch && !isLoading && error;

  return (
    <div className="min-h-screen bg-github-dark">
      {/* Header */}
      <header className="border-b border-github-border bg-github-secondary">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Github className="w-6 h-6 text-github-green" />
            <h1 className="text-xl font-semibold text-github-text">Your GitHub Story</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {showForm && (
          <UsernameForm onSubmit={handleUsernameSubmit} initialUsername={username} />
        )}

        {showLoading && <LoadingSkeleton />}

        {showStory && <StoryDisplay story={githubStory} />}

        {showError && (
          <div className="text-center space-y-6">
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
              <div className="text-red-400 text-4xl mb-4">🔑</div>
              <h3 className="text-xl font-semibold text-github-text mb-2">GitHub Token Required</h3>
              <p className="text-github-text-secondary mb-4">
                To fetch your GitHub data and create your story, you need to provide a GitHub Personal Access Token. 
                This ensures we can access the GitHub API properly.
              </p>
              <div className="text-sm text-github-text-secondary mb-6 text-left max-w-md mx-auto">
                <p className="font-medium mb-2">How to get your token:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Go to GitHub.com → Settings</li>
                  <li>Developer settings → Personal access tokens</li>
                  <li>Generate new token (classic)</li>
                  <li>Select "public_repo" scope</li>
                  <li>Copy the token and provide it when asked</li>
                </ol>
              </div>
              <div className="space-x-4">
                <Button onClick={handleReset} className="bg-github-green hover:bg-green-600">
                  Start Over
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
