"""
Image utility helpers — preprocessing, base64 encoding, validation.
"""

import base64
import io

import cv2
import numpy as np
from PIL import Image

# Accepted MIME types
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/jpg"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


def validate_image(content_type: str, file_size: int) -> str | None:
    """Return an error message string if the upload is invalid, else None."""
    if content_type not in ALLOWED_CONTENT_TYPES:
        return f"Invalid file type '{content_type}'. Only JPG and PNG images are accepted."
    if file_size > MAX_FILE_SIZE:
        return f"File too large ({file_size / 1024 / 1024:.1f} MB). Maximum allowed size is 10 MB."
    return None


def load_image_from_bytes(data: bytes) -> np.ndarray:
    """Decode raw bytes into an OpenCV BGR image (numpy array)."""
    image = Image.open(io.BytesIO(data)).convert("RGB")
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)


def preprocess_image(image: np.ndarray, target_size: tuple[int, int] = (224, 224)) -> np.ndarray:
    """
    Resize and normalise an image for the ResNet50 model.

    Returns a batch-ready float32 tensor of shape (1, 224, 224, 3).
    """
    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    img_resized = cv2.resize(img_rgb, target_size)
    img_array = np.expand_dims(img_resized.astype("float32"), axis=0)
    
    import os
    FORCE_MOCK_MODE = os.environ.get("FORCE_MOCK_MODE", "false").lower() in ("true", "1", "yes")
    if not FORCE_MOCK_MODE:
        try:
            from tensorflow.keras.applications.resnet50 import preprocess_input  # type: ignore
            return preprocess_input(img_array)
        except ImportError:
            pass

    # Fallback manual ResNet50 preprocessing
    # Subtract ImageNet mean BGR values [103.939, 116.779, 123.68] from the array
    img_array = img_array.copy()
    img_array[..., 0] -= 123.68
    img_array[..., 1] -= 116.779
    img_array[..., 2] -= 103.939
    return img_array


def numpy_to_base64(image: np.ndarray) -> str:
    """Encode a BGR numpy image as a base64-encoded PNG string."""
    _, buffer = cv2.imencode(".png", image)
    return base64.b64encode(buffer).decode("utf-8")
