import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * UploadSection — drag-and-drop or click-to-upload image area.
 *
 * Props
 * -----
 * onFileSelect : (file: File) => void
 * isLoading    : boolean
 */
export default function UploadSection({ onFileSelect, isLoading }) {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // --- handlers -----------------------------------------------------------
  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a JPG or PNG image.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("File is too large. Maximum size is 10 MB.");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    },
    []
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const handleInputChange = (e) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const clearPreview = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  const handleUpload = () => {
    if (selectedFile) onFileSelect(selectedFile);
  };

  // --- render -------------------------------------------------------------
  return (
    <section id="upload" className="py-20 inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-brand-900/20">
        
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Try It Yourself
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upload an image to see our AI detection in action
          </p>
        </div>

        {/* Drop zone */}
        {!preview && (
          <div className="relative">
            <label
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`
                relative flex flex-col items-center justify-center gap-6
                h-80 rounded-3xl border-2 border-dashed cursor-pointer
                transition-all duration-300 overflow-hidden
                ${dragActive
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20 scale-[1.02] shadow-lg"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-brand-400 hover:shadow-lg"}
              `}
            >
              {/* Background gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/10 dark:to-purple-900/10 opacity-0 ${dragActive ? 'opacity-100' : 'hover:opacity-50'} transition-opacity`} />

              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-all ${dragActive ? 'bg-brand-600 scale-110' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <Upload
                    size={40}
                    className={`transition-colors ${dragActive ? "text-white" : "text-gray-400 dark:text-gray-500"}`}
                  />
                </div>

                <div className="text-center">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {dragActive ? "Drop your image here" : "Drop an image or click to browse"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Supports JPG and PNG formats
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Maximum size: 10MB
                  </div>
                </div>
              </div>

              <input
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleInputChange}
              />
            </label>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xl">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-[500px] object-contain p-8"
              />
              {!isLoading && (
                <button
                  onClick={clearPreview}
                  className="absolute top-4 right-4 p-3 rounded-xl bg-white/95 dark:bg-gray-800/95
                           hover:bg-white dark:hover:bg-gray-800 shadow-lg text-gray-600 hover:text-red-500
                           dark:text-gray-400 dark:hover:text-red-400 transition-all hover:scale-110 backdrop-blur-sm"
                  aria-label="Remove image"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Analyze button */}
            <Button
              onClick={handleUpload}
              disabled={isLoading}
              className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 size={24} className="animate-spin mr-3" />
                  <span>Analyzing with AI...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <ImageIcon size={24} className="mr-3" />
                  <span>Analyze Image</span>
                </div>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
