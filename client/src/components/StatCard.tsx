interface StatCardProps {
  title: string;
  value: string;
  icon: string;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-github-secondary border border-github-border rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-github-text-secondary text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-github-text">{value}</p>
        </div>
        <div className="text-xl">{icon}</div>
      </div>
    </div>
  );
}
