import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import UploadSection from "./components/UploadSection";
import ResultsSection from "./components/ResultsSection";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import { predictImage } from "./services/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function App() {
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (file) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setPreview(URL.createObjectURL(file));

    try {
      const data = await predictImage(file);
      setResult(data);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Hero + Upload unified section */}
        <div className="relative overflow-hidden">
          {/* Shared gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-brand-900/20" />

          {/* Decorative elements spanning both sections */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-brand-200 dark:bg-brand-900/20 rounded-full blur-3xl opacity-20" />
          <div className="absolute top-[40%] left-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-brand-300 dark:bg-brand-800/20 rounded-full blur-3xl opacity-15" />

          {/* Content */}
          <div className="relative">
            <HeroSection />
            <UploadSection onFileSelect={handleFileSelect} isLoading={isLoading} />
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="max-w-3xl mx-auto px-4 py-8">
            <Alert variant="destructive" className="border-2">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Results */}
        {result && (
          <div id="results">
            <ResultsSection result={result} preview={preview} />
          </div>
        )}

        <StatsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
