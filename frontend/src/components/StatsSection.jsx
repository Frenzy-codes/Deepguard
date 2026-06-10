import { TrendingUp, Zap, Target, Database } from "lucide-react";

const stats = [
  {
    icon: <Target size={24} />,
    value: "97.59%",
    label: "Model Accuracy",
    description: "Validated on 22,000 images",
  },
  {
    icon: <TrendingUp size={24} />,
    value: "98.76%",
    label: "Real Image Precision",
    description: "Highest classification accuracy",
  },
  {
    icon: <Zap size={24} />,
    value: "< 10s",
    label: "Analysis Speed",
    description: "Fast, real-time predictions",
  },
  {
    icon: <Database size={24} />,
    value: "120K+",
    label: "Training Images",
    description: "Real & AI-generated dataset",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
