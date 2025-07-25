import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="animate-spin w-8 h-8 border-2 border-github-green border-t-transparent rounded-full mx-auto"></div>
        <h3 className="text-xl font-semibold text-github-text">Generating your story...</h3>
        <p className="text-github-text-secondary">Fetching your GitHub data and creating visualizations</p>
      </div>

      {/* Profile Skeleton */}
      <div className="bg-github-secondary border border-github-border rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-16 h-16 rounded-full bg-github-border" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 bg-github-border" />
            <Skeleton className="h-4 w-24 bg-github-border" />
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-github-secondary border border-github-border rounded-xl p-4">
            <Skeleton className="h-4 w-16 mb-2 bg-github-border" />
            <Skeleton className="h-8 w-12 bg-github-border" />
          </div>
        ))}
      </div>

      {/* Chart Skeletons */}
      <div className="bg-github-secondary border border-github-border rounded-xl p-6">
        <Skeleton className="h-6 w-48 mb-4 bg-github-border" />
        <Skeleton className="h-64 w-full bg-github-border" />
      </div>

      <div className="bg-github-secondary border border-github-border rounded-xl p-6">
        <Skeleton className="h-6 w-48 mb-4 bg-github-border" />
        <Skeleton className="h-64 w-full bg-github-border" />
      </div>
    </div>
  );
}
