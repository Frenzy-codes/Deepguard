"""
DeepGuard Backend — FastAPI Application
Explainable AI system for detecting AI-generated images.
"""

import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.predict import router as predict_router

app = FastAPI(
    title="DeepGuard API",
    description="Explainable AI system for detecting AI-generated images using Grad-CAM",
    version="1.0.0",
)

# ---------------------------------------------------------------------------
# CORS — allow the React frontend to communicate with the backend
# ---------------------------------------------------------------------------
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
app.include_router(predict_router)


@app.get("/")
async def root():
    """Welcome root endpoint."""
    return {
        "message": "Welcome to DeepGuard API. Access the interactive Swagger docs at /docs",
        "docs": "http://localhost:8000/docs",
        "health": "http://localhost:8000/health",
    }


@app.get("/health")
async def health_check():
    """Simple health-check endpoint."""
    return {"status": "running"}
