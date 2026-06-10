import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white">
                <Shield />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-foreground">
                DeepGuard
              </span>
            </div>
          </a>


          {/* Right side */}
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
