import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { LanguageStats } from "@shared/schema";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LanguageChartProps {
  languages: LanguageStats[];
}

const LANGUAGE_COLORS = [
  '#3b82f6', // blue
  '#eab308', // yellow
  '#22c55e', // green
  '#a855f7', // purple
  '#ef4444', // red
  '#06b6d4', // cyan
  '#f97316', // orange
  '#8b5cf6', // violet
];

export default function LanguageChart({ languages }: LanguageChartProps) {
  const chartData = {
    labels: languages.map(lang => lang.name),
    datasets: [
      {
        data: languages.map(lang => lang.percentage),
        backgroundColor: LANGUAGE_COLORS.slice(0, languages.length),
        borderColor: '#0d1117',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-github-secondary border border-github-border rounded-xl p-6">
      <h3 className="text-xl font-semibold text-github-text mb-4 flex items-center">
        <span className="mr-2">💻</span>
        Language Distribution
      </h3>
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Doughnut Chart */}
        <div className="w-48 h-48 relative">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-github-text">{languages.length}</div>
              <div className="text-xs text-github-text-secondary">languages</div>
            </div>
          </div>
        </div>
        
        {/* Language Legend */}
        <div className="space-y-3 flex-1">
          {languages.slice(0, 4).map((lang, index) => (
            <div key={lang.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: LANGUAGE_COLORS[index] }}
                ></div>
                <span className="text-github-text font-medium">{lang.name}</span>
              </div>
              <span className="text-github-text-secondary">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
