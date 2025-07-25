import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProductivityChartProps {
  commitActivity: {
    byDay: Array<{ day: string; count: number }>;
    byHour: Array<{ hour: number; count: number }>;
  };
}

export default function ProductivityChart({ commitActivity }: ProductivityChartProps) {
  const dayChartData = {
    labels: commitActivity.byDay.map(item => item.day.slice(0, 3)),
    datasets: [
      {
        data: commitActivity.byDay.map(item => item.count),
        backgroundColor: '#238636',
        borderRadius: 4,
      },
    ],
  };

  const dayChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#30363d',
        },
        ticks: {
          color: '#8b949e',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#8b949e',
        },
      },
    },
  };

  const peakHour = commitActivity.byHour.reduce((max, curr) => 
    curr.count > max.count ? curr : max
  );

  return (
    <div className="bg-github-secondary border border-github-border rounded-xl p-6">
      <h3 className="text-xl font-semibold text-github-text mb-4 flex items-center">
        <span className="mr-2">📊</span>
        Commit Activity
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Commits by Day Chart */}
        <div>
          <h4 className="text-sm font-medium text-github-text-secondary mb-3">Commits by Day of Week</h4>
          <div className="h-48 bg-github-dark rounded-lg border border-github-border p-4">
            <Bar data={dayChartData} options={dayChartOptions} />
          </div>
        </div>
        
        {/* Commits by Hour Visualization */}
        <div>
          <h4 className="text-sm font-medium text-github-text-secondary mb-3">Peak Coding Hours</h4>
          <div className="h-48 bg-github-dark rounded-lg border border-github-border p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 border-4 border-github-green rounded-full opacity-20"></div>
                <div className="absolute inset-2 border-4 border-github-green rounded-full opacity-40"></div>
                <div className="absolute inset-4 border-4 border-github-green rounded-full opacity-60"></div>
                <div className="absolute inset-6 border-4 border-github-green rounded-full opacity-80"></div>
                <div className="absolute inset-8 bg-github-green rounded-full"></div>
              </div>
              <div className="mt-4">
                <div className="text-lg font-bold text-github-text">
                  Peak: {peakHour.hour === 0 ? '12 AM' : 
                         peakHour.hour === 12 ? '12 PM' :
                         peakHour.hour > 12 ? `${peakHour.hour - 12} PM` : `${peakHour.hour} AM`}
                </div>
                <div className="text-sm text-github-text-secondary">
                  {peakHour.count} commits
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
