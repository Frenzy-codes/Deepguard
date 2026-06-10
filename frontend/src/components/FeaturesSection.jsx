import { BrainCircuit, BarChart3, Eye, Shield, Zap, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <BrainCircuit size={28} />,
    title: "Explainable AI",
    description: "Grad-CAM heatmaps show exactly which regions influenced the model's decision, making AI transparent and trustworthy.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "High Accuracy",
    description: "Trained on 120K+ images with 97.59% validation accuracy. ResNet50 architecture ensures reliable predictions.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    icon: <Eye size={28} />,
    title: "Visual Insights",
    description: "Side-by-side comparison of original image and heatmap overlay reveals the AI's reasoning process.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: <Shield size={28} />,
    title: "Production Ready",
    description: "Built with FastAPI and TensorFlow for fast, scalable deployment. REST API ready for integration.",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  {
    icon: <Zap size={28} />,
    title: "Fast Processing",
    description: "Optimized inference pipeline delivers results in under 2 seconds with real-time image preprocessing.",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    textColor: "text-yellow-600 dark:text-yellow-400",
  },
  {
    icon: <CheckCircle size={28} />,
    title: "Academic Grade",
    description: "Suitable for research papers and presentations. Includes confusion matrix and detailed metrics.",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    textColor: "text-pink-600 dark:text-pink-400",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Industry-leading AI detection with transparency and reliability at its core
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-brand-200 dark:hover:border-brand-700 transition-all hover:shadow-xl"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.bgColor} ${feature.textColor} mb-5`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
