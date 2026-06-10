import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications.resnet50 import preprocess_input
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
try:
    from app.services.model_service import load_model as custom_load_model
except ImportError:
    pass

# Settings
MODEL_PATH = "../model/deepguard_model.h5"
DATASET_DIR = "../dataset"
IMG_SIZE = 224
BATCH_SIZE = 32

print("Loading model from", MODEL_PATH)

# Turn off annoying TF logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

try:
    model = load_model(MODEL_PATH)
except Exception as e:
    print("Error loading standard Keras model, falling back to custom architecture...", e)
    from training.train_model import build_model
    model = build_model(IMG_SIZE, 1e-4, 140)
    model.load_weights(MODEL_PATH)

print("Model loaded successfully.")

datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input,
    validation_split=0.2
)

# Only evaluate on validation set
print("Loading validation dataset from", DATASET_DIR)
val_gen = datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="binary",
    subset="validation",
    shuffle=False
)

print(f"Number of validation samples: {val_gen.samples}")
print(f"Class indices: {val_gen.class_indices}")

print("Running predictions...")
predictions = model.predict(val_gen, steps=np.ceil(val_gen.samples / BATCH_SIZE))
y_pred = (predictions > 0.5).astype(int).reshape(-1)
y_true = val_gen.classes

print("\n--- Confusion Matrix ---")
cm = confusion_matrix(y_true, y_pred)
print("True Negatives:", cm[0][0])
print("False Positives:", cm[0][1])
print("False Negatives:", cm[1][0])
print("True Positives:", cm[1][1])
print("Full Matrix:")
print(cm)

print("\n--- Classification Report ---")
target_names = list(val_gen.class_indices.keys())
print(classification_report(y_true, y_pred, target_names=target_names))

# Visualize Confusion Matrix
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=target_names, yticklabels=target_names)
plt.title('Confusion Matrix: Real vs AI Generated')
plt.ylabel('Actual Label')
plt.xlabel('Predicted Label')
plt.tight_layout()
plt.savefig('confusion_matrix.png', dpi=300)
print("\nConfusion matrix visualization saved as 'confusion_matrix.png'")
