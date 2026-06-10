import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

import cv2
import numpy as np
from app.services.model_service import load_model, predict, LAST_CONV_LAYER
from app.utils.image_utils import load_image_from_bytes, preprocess_image, numpy_to_base64
from app.services.gradcam import generate_gradcam, overlay_heatmap

try:
    with open('../dataset/real/0000.jpg', 'rb') as f:
        data = f.read()

    original_image = load_image_from_bytes(data)
    img_tensor = preprocess_image(original_image)
    model = load_model()

    print("Generating Grad-CAM...")
    heatmap = generate_gradcam(model, img_tensor, last_conv_layer_name=LAST_CONV_LAYER)
    print("Overlaying...")
    overlay = overlay_heatmap(original_image, heatmap)
    print("Base64...")
    heatmap_b64 = numpy_to_base64(overlay)
    print("Done! Len:", len(heatmap_b64))

except Exception as e:
    import traceback
    traceback.print_exc()
