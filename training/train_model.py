"""
DeepGuard — Model Training Script
Train a binary classifier (Real vs AI-Generated) using ResNet50 transfer learning.
"""

import argparse
import os
import tensorflow as tf

from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import mixed_precision

# --------------------------------------------------
# GPU SETTINGS
# --------------------------------------------------

# Enable mixed precision (faster on RTX GPUs)
mixed_precision.set_global_policy("mixed_float16")

# Prevent TensorFlow from allocating all GPU memory
gpus = tf.config.list_physical_devices("GPU")
if gpus:
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)

# --------------------------------------------------
# CLI Arguments
# --------------------------------------------------

def parse_args():
    parser = argparse.ArgumentParser(description="Train DeepGuard model")

    parser.add_argument("--dataset", type=str, default="../dataset")
    parser.add_argument("--output", type=str, default="../model/deepguard_model.h5")
    parser.add_argument("--epochs", type=int, default=15)
    parser.add_argument("--batch", type=int, default=32)
    parser.add_argument("--img_size", type=int, default=224)
    parser.add_argument("--lr", type=float, default=1e-4)
    parser.add_argument("--fine_tune_at", type=int, default=140)

    return parser.parse_args()

# --------------------------------------------------
# DATA GENERATORS
# --------------------------------------------------

def create_data_generators(dataset_dir, img_size, batch_size):

    datagen = ImageDataGenerator(
        preprocessing_function=preprocess_input,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.15,
        zoom_range=0.15,
        horizontal_flip=True,
        fill_mode="nearest",
        validation_split=0.2,
    )

    train_gen = datagen.flow_from_directory(
        dataset_dir,
        target_size=(img_size, img_size),
        batch_size=batch_size,
        class_mode="binary",
        subset="training",
        shuffle=True,
    )

    val_gen = datagen.flow_from_directory(
        dataset_dir,
        target_size=(img_size, img_size),
        batch_size=batch_size,
        class_mode="binary",
        subset="validation",
        shuffle=False,
    )

    return train_gen, val_gen

# --------------------------------------------------
# MODEL
# --------------------------------------------------

def build_model(img_size, learning_rate, fine_tune_at):

    base_model = ResNet50(
        weights="imagenet",
        include_top=False,
        input_shape=(img_size, img_size, 3),
    )

    base_model.trainable = True

    for layer in base_model.layers[:fine_tune_at]:
        layer.trainable = False

    model = Sequential([
        base_model,
        GlobalAveragePooling2D(),
        Dense(256, activation="relu"),
        Dropout(0.5),
        Dense(1, activation="sigmoid", dtype="float32")
    ])

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate),
        loss="binary_crossentropy",
        metrics=["accuracy"],
    )

    model.summary()
    return model

# --------------------------------------------------
# TRAINING
# --------------------------------------------------

def train(args):

    os.makedirs(os.path.dirname(args.output), exist_ok=True)

    print(f"\nDataset : {os.path.abspath(args.dataset)}")
    print(f"Output  : {os.path.abspath(args.output)}")
    print(f"Epochs  : {args.epochs}")
    print(f"Batch   : {args.batch}")
    print(f"Img Size: {args.img_size}\n")

    train_gen, val_gen = create_data_generators(
        args.dataset,
        args.img_size,
        args.batch,
    )

    print("Classes:", train_gen.class_indices)

    model = build_model(args.img_size, args.lr, args.fine_tune_at)

    callbacks = [

        EarlyStopping(
            monitor="val_loss",
            patience=5,
            restore_best_weights=True
        ),

        ModelCheckpoint(
            args.output,
            monitor="val_accuracy",
            save_best_only=True,
            verbose=1
        ),

        ReduceLROnPlateau(
            monitor="val_loss",
            factor=0.5,
            patience=3,
            min_lr=1e-7,
            verbose=1
        )
    ]

    history = model.fit(
        train_gen,
        validation_data=val_gen,
        epochs=args.epochs,
        callbacks=callbacks
    )

    print("\nTraining complete.")
    print("Best model saved to:", args.output)

    return history

# --------------------------------------------------
# ENTRY POINT
# --------------------------------------------------

if __name__ == "__main__":
    train(parse_args())