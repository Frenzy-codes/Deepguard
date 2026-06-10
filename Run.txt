DeepGuard — Setup and Run Guide
===============================

This guide explains how to run the DeepGuard project locally.

The project contains:
- FastAPI backend
- Training pipeline (ResNet50)
- Grad-CAM explainability
- Optional GPU acceleration

------------------------------------------------------------
SYSTEM REQUIREMENTS
------------------------------------------------------------

Recommended:
• Python 3.10
• 16GB RAM
• NVIDIA GPU (RTX 4050 recommended)

Works without GPU as well (CPU training).

------------------------------------------------------------
STEP 1 — Clone the Repository
------------------------------------------------------------

Open terminal and run:

git clone https://github.com/YOUR_USERNAME/DeepGuard.git
cd DeepGuard

------------------------------------------------------------
STEP 2 — Open Project in VS Code
------------------------------------------------------------

Open VS Code.

File → Open Folder → Select the DeepGuard folder.

------------------------------------------------------------
STEP 3 — Create Python Virtual Environment
------------------------------------------------------------

Open terminal in VS Code.

Navigate to backend folder:

cd backend

Create environment:

python -m venv venv

Activate environment:

Windows:
venv\Scripts\activate

Mac/Linux:
source venv/bin/activate

Terminal should show:

(venv)

------------------------------------------------------------
STEP 4 — Install Required Libraries
------------------------------------------------------------

Install dependencies:

pip install -r requirements.txt

------------------------------------------------------------
STEP 5 — Dataset Setup
------------------------------------------------------------

Create the dataset folder in project root:

https://www.kaggle.com/datasets/birdy654/cifake-real-and-ai-generated-synthetic-images

DeepGuard/
dataset/
   real/
   ai_generated/

Place images inside these folders.

Example:

dataset/
   real/
       image1.jpg
       image2.jpg
   ai_generated/
       image1.jpg
       image2.jpg

------------------------------------------------------------
STEP 6 — Train the Model
------------------------------------------------------------

Navigate to training folder:

cd ../training

Run training:

python train_model.py --dataset ../dataset

Default training settings:

Image size: 224x224
Batch size: 32
Epochs: 15
Learning rate: 0.0001

After training completes, the model will be saved at:

model/deepguard_model.h5

------------------------------------------------------------
STEP 7 — Start the API Server
------------------------------------------------------------

Navigate back to backend:

cd ../backend

Run FastAPI server:

uvicorn main:app --reload

Server will start at:

http://127.0.0.1:8000

------------------------------------------------------------
STEP 8 — Test the API
------------------------------------------------------------

Open browser and go to:

http://127.0.0.1:8000/docs

Use the /predict endpoint to upload an image and get predictions.

------------------------------------------------------------
GPU SETUP (OPTIONAL — RTX 4050)
------------------------------------------------------------

If your system has an NVIDIA RTX 4050, GPU training can be enabled.

STEP 1 — Install NVIDIA Drivers

Download latest drivers:

https://www.nvidia.com/Download/index.aspx

Restart the computer after installation.

------------------------------------------------------------

STEP 2 — Verify GPU Installation

Run:

nvidia-smi

You should see your GPU information (RTX 4050).

------------------------------------------------------------

STEP 3 — Install CUDA Toolkit

Download CUDA 11.8:

https://developer.nvidia.com/cuda-11-8-0-download-archive

Install using default settings.

Restart the system.

------------------------------------------------------------

STEP 4 — Install cuDNN

Download cuDNN:

https://developer.nvidia.com/cudnn

Extract files into the CUDA folder.

Example path:

C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8

------------------------------------------------------------

STEP 5 — Verify TensorFlow GPU Access

Run:

python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"

Expected output:

[PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]

------------------------------------------------------------

STEP 6 — Monitor GPU Usage

While training runs, open another terminal and run:

nvidia-smi

GPU memory usage should increase.

------------------------------------------------------------
PROJECT STRUCTURE
------------------------------------------------------------

DeepGuard/
│
├── backend/        → FastAPI backend
│   ├── app/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/       → Web UI
│
├── training/       → Model training scripts
│
├── dataset/        → Training images
│
├── model/          → Saved trained model
│
└── README.md

------------------------------------------------------------
NOTES
------------------------------------------------------------

• First training may take time depending on dataset size.
• GPU significantly speeds up training.
• Once a trained model exists, the API will automatically load it.
