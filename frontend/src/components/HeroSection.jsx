import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToUpload = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 pb-12 sm:pt-32 sm:pb-16">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-brand-200 dark:border-brand-800 shadow-sm mb-8">
            <Sparkles size={16} className="text-brand-600 dark:text-brand-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Powered by Explainable AI • 97.59% Accuracy
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Detect AI-Generated
            <span className="block mt-2 bg-gradient-to-r from-brand-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Images Instantly
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Identify AI-generated images with advanced deep learning technology.
            Get instant predictions with confidence scores and visual explanations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              onClick={scrollToUpload}
              className="h-12 px-8 text-base rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Try It Now
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-12 px-8 text-base rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <a href="#how-it-works">
                Learn How It Works
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-brand-600 dark:text-brand-400" />
              <span>ResNet50 CNN</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-brand-600 dark:text-brand-400" />
              <span>Grad-CAM Explainability</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-brand-600 dark:text-brand-400" />
              <span>EXIF Metadata Audit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
