import type { GitHubUser } from "@shared/schema";
import { MapPin, Users, Calendar } from "lucide-react";

interface UserProfileProps {
  user: GitHubUser;
}

export default function UserProfile({ user }: UserProfileProps) {
  const joinYear = new Date(user.created_at).getFullYear();

  return (
    <div className="bg-github-secondary border border-github-border rounded-xl p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <img 
          src={user.avatar_url} 
          alt={`${user.name || user.login}'s profile picture`}
          className="w-20 h-20 rounded-full border-2 border-github-border"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-github-text">
            {user.name || user.login}
          </h2>
          <p className="text-github-text-secondary">@{user.login}</p>
          {user.bio && (
            <p className="text-github-text-secondary mt-2 max-w-md">
              {user.bio}
            </p>
          )}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-github-text-secondary">
            {user.location && (
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {user.location}
              </span>
            )}
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {user.followers.toLocaleString()} followers
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Joined {joinYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
