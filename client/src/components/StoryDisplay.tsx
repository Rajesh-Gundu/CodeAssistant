import UserProfile from "./UserProfile";
import StatCard from "./StatCard";
import ProductivityChart from "./ProductivityChart";
import LanguageChart from "./LanguageChart";
import TopRepos from "./TopRepos";
import { Button } from "@/components/ui/button";
import { Download, Twitter } from "lucide-react";
import type { GitHubStory } from "@shared/schema";

interface StoryDisplayProps {
  story: GitHubStory;
}

export default function StoryDisplay({ story }: StoryDisplayProps) {
  const handleDownload = () => {
    // TODO: Implement image generation functionality
    console.log("Download functionality to be implemented");
  };

  const handleShare = () => {
    const text = `Check out my GitHub story! 🚀 ${story.stats.public_repos} repos, ${story.stats.total_stars} stars, coding in ${story.stats.languages_count} languages.`;
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* User Profile */}
      <UserProfile user={story.user} />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Public Repos" 
          value={story.stats.public_repos.toString()} 
          icon="📁"
        />
        <StatCard 
          title="Total Stars" 
          value={story.stats.total_stars.toString()} 
          icon="⭐"
        />
        <StatCard 
          title="Total Forks" 
          value={story.stats.total_forks.toString()} 
          icon="🔀"
        />
        <StatCard 
          title="Languages" 
          value={story.stats.languages_count.toString()} 
          icon="💻"
        />
      </div>

      {/* Productivity Chart */}
      <ProductivityChart commitActivity={story.commitActivity} />

      {/* Language Chart */}
      <LanguageChart languages={story.languages} />

      {/* Top Repositories */}
      <TopRepos repos={story.topRepos} />

      {/* Share Section */}
      <div className="bg-github-secondary border border-github-border rounded-xl p-6 text-center">
        <h3 className="text-xl font-semibold text-github-text mb-4">Share Your Story</h3>
        <p className="text-github-text-secondary mb-6">
          Love your GitHub story? Share it with the world!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleDownload} className="bg-github-green hover:bg-green-600">
            <Download className="w-4 h-4 mr-2" />
            Download as Image
          </Button>
          <Button onClick={handleShare} className="bg-blue-600 hover:bg-blue-700">
            <Twitter className="w-4 h-4 mr-2" />
            Share on Twitter
          </Button>
        </div>
      </div>
    </div>
  );
}
