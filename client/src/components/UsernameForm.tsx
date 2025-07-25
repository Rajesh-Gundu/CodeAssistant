import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3 } from "lucide-react";

interface UsernameFormProps {
  onSubmit: (username: string) => void;
  initialUsername?: string;
}

export default function UsernameForm({ onSubmit, initialUsername = "" }: UsernameFormProps) {
  const [username, setUsername] = useState(initialUsername);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-github-text">Discover Your GitHub Story</h2>
        <p className="text-github-text-secondary text-lg max-w-2xl mx-auto">
          Enter your GitHub username to generate a beautiful infographic showcasing your coding journey, 
          commit patterns, favorite languages, and top repositories.
        </p>
      </div>

      <div className="bg-github-secondary border border-github-border rounded-xl p-8 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <Label htmlFor="username" className="text-sm font-medium text-github-text mb-2 block">
              GitHub Username
            </Label>
            <Input 
              type="text" 
              id="username"
              name="username"
              placeholder="e.g., octocat"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-github-dark border border-github-border rounded-lg text-github-text placeholder-github-text-secondary focus:outline-none focus:ring-2 focus:ring-github-green focus:border-transparent"
            />
          </div>
          <Button 
            type="submit"
            className="w-full bg-github-green hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-github-green focus:ring-offset-2 focus:ring-offset-github-dark"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate My Story
          </Button>
        </form>
      </div>
    </div>
  );
}
