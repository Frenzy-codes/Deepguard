import { Shield, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-600 text-white">
                <Shield size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                DeepGuard
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Academic-grade AI detection for image authenticity with transparency and explainability at its core.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#how-it-works" className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#upload" className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Try Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Technology
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600 dark:text-gray-400">
                ResNet50 Architecture
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                Grad-CAM Explainability
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                TensorFlow & FastAPI
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} DeepGuard. Academic research project.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              Built with <Heart size={14} className="text-red-500" /> by Team DeepGuard
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

