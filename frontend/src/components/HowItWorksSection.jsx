import { Upload, Brain, LineChart, Eye } from "lucide-react";

const steps = [
  {
    icon: <Upload size={28} />,
    step: "01",
    title: "Upload Image",
    description: "Drag and drop or select any JPG or PNG image up to 10MB",
  },
  {
    icon: <Brain size={28} />,
    step: "02",
    title: "AI Analysis",
    description: "ResNet50 model processes image with 97.59% accuracy",
  },
  {
    icon: <LineChart size={28} />,
    step: "03",
    title: "Get Results",
    description: "Receive classification label with confidence score",
  },
  {
    icon: <Eye size={28} />,
    step: "04",
    title: "Visual Explanation",
    description: "View Grad-CAM heatmap showing model's focus areas",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our explainable AI pipeline makes image authenticity detection transparent and reliable
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line - only show on desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-brand-200 to-transparent dark:from-brand-800" />
              )}

              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                {/* Step number badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-brand-600 to-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 text-brand-600 dark:text-brand-400 mb-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
