import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 s — model inference can be slow
});

/**
 * Upload an image for prediction.
 * @param {File} file - The image file to analyse.
 * @returns {Promise<{label: string, confidence: number, reliability: string, heatmap: string}>}
 */
export async function predictImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}

/**
 * Check backend health.
 * @returns {Promise<{status: string}>}
 */
export async function healthCheck() {
  const response = await api.get("/health");
  return response.data;
}

export default api;
