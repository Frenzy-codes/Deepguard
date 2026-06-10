import { useState } from "react";
import { CheckCircle2, XCircle, TrendingUp, AlertTriangle, FileJson, ShieldAlert, Info } from "lucide-react";

/**
 * ResultsSection — displays prediction label, confidence bar, and
 * side-by-side original + Grad-CAM heatmap.
 *
 * Props
 * -----
 * result   : { label, confidence, heatmap, metadata }
 * preview  : string — data URL of the uploaded image
 */
export default function ResultsSection({ result, preview }) {
  if (!result) return null;

  const [activeTab, setActiveTab] = useState("side-by-side");
  const [opacity, setOpacity] = useState(50);

  const isReal = result.label === "Real";
  const pct = Math.round(result.confidence * 100);

  // Determine confidence level
  const getConfidenceLevel = () => {
    if (pct >= 90) return { text: "Very High", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" };
    if (pct >= 75) return { text: "High", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" };
    if (pct >= 60) return { text: "Medium", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" };
    return { text: "Low", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20" };
  };

  const confidenceLevel = getConfidenceLevel();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Results header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            {isReal ? (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <CheckCircle2 size={32} className="text-white" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                <XCircle size={32} className="text-white" />
              </div>
            )}
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {result.label}
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isReal ? "This image appears to be authentic" : "This image appears to be AI-generated"}
          </p>
        </div>

        {/* Confidence metrics */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {/* Confidence score */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center">
                <TrendingUp size={20} className="text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Confidence Score
              </h3>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-5xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
                {pct}
              </span>
              <span className="text-3xl text-gray-500 dark:text-gray-400">%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${isReal ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Reliability indicator */}
          <div className={`${confidenceLevel.bg} rounded-2xl p-6 border ${isReal ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'} shadow-lg`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${isReal ? 'bg-green-200 dark:bg-green-900/30' : 'bg-red-200 dark:bg-red-900/30'} flex items-center justify-center`}>
                <AlertTriangle size={20} className={isReal ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Reliability
              </h3>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${confidenceLevel.bg} border ${isReal ? 'border-green-300 dark:border-green-700' : 'border-red-300 dark:border-red-700'}`}>
              <span className={`text-2xl font-bold ${confidenceLevel.color}`}>
                {confidenceLevel.text}
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Based on model confidence and training data
            </p>
          </div>

          {/* Metadata Audit */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <FileJson size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Metadata Audit
                </h3>
              </div>

              {result.metadata ? (
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between border-b border-gray-100 dark:border-gray-700/50 pb-2">
                    <span className="text-gray-400">Dimensions:</span>
                    <span className="font-medium">{result.metadata.dimensions}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-gray-700/50 pb-2">
                    <span className="text-gray-400">Format:</span>
                    <span className="font-medium">{result.metadata.file_type}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-gray-700/50 pb-2">
                    <span className="text-gray-400">Source Device:</span>
                    <span className="font-medium max-w-[150px] truncate text-right">
                      {result.metadata.camera_model !== "N/A"
                        ? `${result.metadata.camera_make} ${result.metadata.camera_model}`
                        : "No EXIF Data"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-gray-700/50 pb-2">
                    <span className="text-gray-400">Software:</span>
                    <span className="font-medium max-w-[150px] truncate text-right text-gray-900 dark:text-white">
                      {result.metadata.software !== "N/A" ? result.metadata.software : "None Detected"}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400">No metadata returned.</p>
              )}
            </div>

            {result.metadata && (
              <div className="mt-4">
                {result.metadata.ai_tool_detected ? (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-semibold">
                    <ShieldAlert size={14} className="shrink-0" />
                    <span className="truncate">{result.metadata.ai_tool_detected}</span>
                  </div>
                ) : result.metadata.has_exif ? (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400 text-xs font-semibold">
                    <CheckCircle2 size={14} className="shrink-0" />
                    <span>Camera EXIF signature found</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs font-semibold">
                    <Info size={14} className="shrink-0" />
                    <span>Unsigned (Metadata Stripped)</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Visual explanation */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Visual Explanation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The Grad-CAM heatmap highlights the regions that influenced the AI's decision
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("side-by-side")}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === "side-by-side"
                  ? "bg-brand-600 text-white shadow-md hover:bg-brand-700"
                  : "bg-gray-100 dark:bg-gray-850 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              Side-by-Side View
            </button>
            <button
              onClick={() => setActiveTab("blender")}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === "blender"
                  ? "bg-brand-600 text-white shadow-md hover:bg-brand-700"
                  : "bg-gray-100 dark:bg-gray-850 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              Interactive Overlay Slider
            </button>
          </div>

          {activeTab === "side-by-side" ? (
            <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
              {/* Original image */}
              <div className="group">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-600 transition-all">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      📷 Original Image
                    </p>
                  </div>
                  <div className="p-6">
                    <img
                      src={preview}
                      alt="Original"
                      className="w-full h-80 object-contain rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Heatmap */}
              <div className="group">
                <div className="bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 rounded-2xl overflow-hidden border-2 border-brand-200 dark:border-brand-800 hover:border-brand-400 dark:hover:border-brand-600 transition-all">
                  <div className="p-4 border-b border-brand-200 dark:border-brand-800 bg-white dark:bg-gray-800/50">
                    <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">
                      🔥 Grad-CAM Heatmap
                    </p>
                  </div>
                  <div className="p-6">
                    <img
                      src={`data:image/png;base64,${result.heatmap}`}
                      alt="Grad-CAM heatmap"
                      className="w-full h-80 object-contain rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center p-6 h-[400px]">
                {/* Base Image */}
                <img
                  src={preview}
                  alt="Original Base"
                  className="w-full h-full object-contain rounded-2xl"
                />
                {/* Blended Heatmap Overlay */}
                <img
                  src={`data:image/png;base64,${result.heatmap}`}
                  alt="Heatmap Overlay"
                  className="absolute inset-0 w-full h-full object-contain p-6 rounded-2xl pointer-events-none transition-opacity duration-75"
                  style={{ opacity: opacity / 100 }}
                />
              </div>

              {/* Slider Control */}
              <div className="bg-gray-50 dark:bg-gray-850 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3 shadow-md">
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">
                  <span>📷 Original</span>
                  <span className="text-brand-600 dark:text-brand-400 font-bold">Heatmap Opacity: {opacity}%</span>
                  <span>🔥 Heatmap Overlay</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-250 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
              </div>
            </div>
          )}

          {/* Explanation text */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-brand-600 dark:text-brand-400">How to interpret:</strong> The red/yellow regions in the heatmap show areas the AI model focused on most when making its prediction. This transparency helps you understand and trust the AI's decision-making process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
