import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const scrollToUpload = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-brand-600 via-purple-600 to-brand-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Detect AI-Generated Images?
        </h2>
        <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
          Join researchers and professionals using DeepGuard for transparent AI image detection
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={scrollToUpload}
            className="h-14 px-8 text-lg font-semibold rounded-xl bg-white text-brand-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all"
          >
            Get Started Free
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>

        <p className="mt-8 text-sm text-brand-100">
          ✓ No signup required  •  ✓ 100% free  •  ✓ Academic research project
        </p>
      </div>
    </section>
  );
}
