# 🛡️ DeepGuard

**Explainable AI for Image Authenticity Detection**

<p align="center">
  <img src="https://img.shields.io/badge/DeepGuard-Explainable%20AI-6366f1?style=for-the-badge" alt="DeepGuard" />
  <img src="https://img.shields.io/badge/Python-3.11%20%7C%203.14-3776ab?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TensorFlow-2.15-ff6f00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow" />
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
</p>

<p align="center">
  <a href="https://render.com/deploy?repo=https://github.com/Frenzy-codes/Deepguard">
    <img src="https://render.com/images/deploy-to-render.svg" alt="Deploy to Render" />
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFrenzy-codes%2FDeepguard&root-directory=frontend&env=VITE_API_URL">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
</p>

DeepGuard is an academic-grade full-stack system designed to detect whether an image is **Genuine (Real)** or **AI-Generated (Fake)**, providing visual evidence of its decision using **Grad-CAM class activation mapping**. The system features a custom ResNet50 convolutional neural network, a FastAPI backend, and a high-fidelity glassmorphic React frontend.

---

## ✨ Key Features

* **Dual-Layer Forensic Pipeline**: Combines deep learning classification with EXIF metadata parsing and AIGC signature audits.
* **EXIF & AIGC Metadata Scanner**: Automatically parses embedded camera metadata (make, model, software, creation dates) and scans PNG/JPEG text chunks for AI signatures (e.g., Stable Diffusion prompt parameters, Midjourney metadata, and DALL-E tags). AI-detected metadata automatically overrides classification to `AI-Generated` with 100% confidence.
* **Interactive Heatmap Opacity Blender**: An interactive slider overlay in the React UI allows users to dynamically blend and fade the Grad-CAM activation heatmap on top of their uploaded image.
* **Memory-Optimized Cloud Fallback**: Features a robust, silent `FORCE_MOCK_MODE` environment toggle. If enabled (e.g., on Render's 512MB free tier to prevent Out-of-Memory crashes) or if TensorFlow is missing, the backend runs in a fast, lightweight mock mode (~35MB RAM).
* **Premium Glassmorphic Design**: Clean typography with Google Font *Plus Jakarta Sans*, vibrant color states, smooth animations, and fully responsive grid layouts.

---

## 📐 Architecture & Flow

```
                      [ User Uploads Image ]
                                ↓
        [ React Frontend ] (Vite + Plus Jakarta Sans + Axios)
                                ↓ POST /predict
          [ FastAPI Backend ] (CORS Enabled, port 8000)
             /                                      \
            /                                        \
  [ EXIF & AIGC Scanner ]                  [ Deep Learning Classifier ]
 (Pillow metadata scans)                    (ResNet50 Sigmoid Output)
            \                                        /
             \                                      /
       [ Payload Builder ] ──←── [ Grad-CAM Heatmap Generator ]
  { label, confidence, heatmap_b64, metadata }
                                ↓
  [ Frontend Overlay Blender ] (Dynamic alpha slider controls)
```

---

## 📂 Project Structure

```
DeepGuard/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI server configuration
│   │   ├── routes/
│   │   │   └── predict.py           # POST /predict controller
│   │   ├── services/
│   │   │   ├── model_service.py     # Model loader & inference wrapper
│   │   │   └── gradcam.py           # Grad-CAM heatmap generator
│   │   └── utils/
│   │       ├── image_utils.py       # Image validation & BGR preprocessing
│   │       └── metadata_utils.py    # Pillow-based EXIF and AIGC scanner
│   ├── requirements.txt             # Backend dependencies
│   ├── test_model.py                # Local model prediction tests
│   ├── test_gradcam.py              # Local Grad-CAM heatmap rendering tests
│   └── test_predict.py              # Local API router endpoint tests
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Premium glassmorphic header
│   │   │   ├── HeroSection.jsx      # Title & onboarding intro
│   │   │   ├── UploadSection.jsx    # Drag-and-drop file uploader
│   │   │   ├── ResultsSection.jsx   # Results dashboard with opacity slider
│   │   │   └── Footer.jsx           # Info footer
│   │   ├── services/
│   │   │   └── api.js               # Axios client
│   │   ├── App.jsx
│   │   ├── index.css                # Base Tailwind & custom card borders
│   │   └── main.jsx
│   ├── index.html                   # HTML template & Jakarta font loading
│   ├── package.json                 # Node dependencies
│   ├── vite.config.js               # Proxy setup for localhost dev
│   └── vercel.json                  # Vercel SPA rewrites config
├── model/
│   └── deepguard_model.h5           # Model file placeholder
├── training/
│   └── train_model.py               # Complete ResNet50 fine-tuning script
├── render.yaml                      # Render Infrastructure-as-code Blueprint
└── README.md
```

---

## 🚀 Local Development Quick Start

### Prerequisites

* Python $\ge$ 3.10 (Tested on Python 3.11.7 and Python 3.14.5)
* Node.js $\ge$ 18 (Tested on Node.js v24.16.0)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python -m uvicorn app.main:app --port 8000 --reload
```

The API docs will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The React interface will be running at [http://localhost:5173](http://localhost:5173). The Vite proxy configuration automatically routes `/predict` and `/health` requests to `http://localhost:8000`.

---

## 🏋️ Model Training

The training directory includes a transfer learning pipeline based on **ResNet50** pre-trained on ImageNet.

```bash
cd training

# Train with default settings (expects dataset/real and dataset/ai_generated)
python train_model.py --epochs 15 --batch 32 --lr 0.0001
```

### CLI Options:
* `--dataset`: Directory path of dataset (default: `../dataset`)
* `--output`: Output file path for saving the model (default: `../model/deepguard_model.h5`)
* `--epochs`: Maximum number of training epochs (default: `15`)
* `--lr`: Base learning rate (default: `1e-4`)
* `--fine_tune_at`: Unfreeze base ResNet50 weights starting at this layer index (default: `140`)

---

## 🔌 API Reference

### Health Check
`GET /health`
* **Response**: `{"status": "running"}`

### Predict Authenticity
`POST /predict`
* **Request**: `multipart/form-data` with form field `file` (JPG/PNG image file $\le$ 10MB)
* **Response Payload (`200 OK`)**:

```json
{
  "label": "AI-Generated",
  "confidence": 1.00,
  "reliability": "High (Metadata Confirmed)",
  "heatmap": "<base64_encoded_png_image>",
  "metadata": {
    "has_exif": false,
    "camera_make": "N/A",
    "camera_model": "N/A",
    "software": "Stable Diffusion",
    "created_at": "N/A",
    "ai_tool_detected": "Stable Diffusion Metadata Signature",
    "file_type": "PNG",
    "dimensions": "1024 x 1024"
  }
}
```

---

## 🧪 Running Backend Tests

Run the following scripts inside the `backend` directory to verify your installation:

```bash
cd backend

# Verify model service fallback architecture
python test_model.py

# Verify Grad-CAM activation mapping
python test_gradcam.py

# Verify FastAPI endpoint responses
python test_predict.py
```

---

## ☁️ Production Deployment

### 1. Backend on Render (Web Service)
1. Go to your [Render Dashboard](https://dashboard.render.com).
2. Create a **New +** -> **Web Service** or choose **Blueprint** (which automatically parses the root [render.yaml](file:///c:/Users/kaust/OneDrive/Documents/Projects/DeepGuard/Deepguard_V2.0-main/Deepguard_V2.0-main/render.yaml) file).
3. Connect your repository.
4. Set **Root Directory** to `backend`.
5. Set the following environment variables:
   * `PYTHON_VERSION` = `3.11.7`
   * `FORCE_MOCK_MODE` = `true` *(Forces lightweight execution to prevent OOM on Render Free Tier)*
   * `ALLOWED_ORIGINS` = `*`

### 2. Frontend on Vercel
1. Go to your [Vercel Dashboard](https://vercel.com).
2. Import the same repository (`Frenzy-codes/Deepguard`).
3. Set **Root Directory** to `frontend`.
4. Add the following environment variable:
   * `VITE_API_URL` = *Your live Render backend URL* (e.g., `https://deepguard-backend-yuuc.onrender.com`).
5. Click **Deploy**.

---

## 📜 License & Disclaimers

This project is open-source and intended solely for **academic, research, and educational purposes**. It is not designed to be used as legal evidence, forensic testimony, or for commercial content moderation.

---
<p align="center">
  Built with ❤️ by Team DeepGuard for Explainable AI research
</p>
