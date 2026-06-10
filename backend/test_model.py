import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

import cv2
import numpy as np
from app.services.model_service import load_model, predict
from app.utils.image_utils import load_image_from_bytes, preprocess_image

try:
    with open('../dataset/real/0000.jpg', 'rb') as f:
        data = f.read()

    print("Loading image...")
    image = load_image_from_bytes(data)

    print("Preprocessing image...")
    img_tensor = preprocess_image(image)

    print("Running prediction...")
    result = predict(img_tensor)
    print("RESULT:", result)
except Exception as e:
    import traceback
    traceback.print_exc()
