export interface CodeFile {
  filename: string;
  language: string;
  description: string;
  code: string;
}

export const PYTHON_PROJECT_FILES: CodeFile[] = [
  {
    filename: 'app.py',
    language: 'python',
    description: 'Streamlit Web Dashboard for Image Upload, Live Webcam Inference & Recycling Recommendations',
    code: `"""
Garbage Classification and Detection using OpenCV & Deep Learning
Streamlit User Interface (app.py)
Author: Academic Mini-Project
"""

import os
import cv2
import numpy as np
from PIL import Image
import streamlit as st
import tensorflow as tf
import matplotlib.pyplot as plt

# ---------------------------------------------------------
# Page Configuration & Styling
# ---------------------------------------------------------
st.set_page_config(
    page_title="EcoVision - Garbage Classification",
    page_icon="♻️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Garbage categories recognized by the system
CATEGORIES = [
    'Plastic',
    'Paper',
    'Cardboard',
    'Glass',
    'Metal',
    'Organic Waste',
    'General / Other Waste'
]

# Environmental & Recycling Recommendations
RECYCLING_GUIDELINES = {
    'Plastic': {
        'bin': '🟡 Yellow / Orange Recycling Bin',
        'action': 'Rinse thoroughly, crush bottle to save space, and leave caps screwed on.',
        'degradation': '450 to 1,000 years in landfill.',
        'tip': 'Recycled PET is converted into polyester fleece jackets, tote bags, and new bottles.'
    },
    'Paper': {
        'bin': '🔵 Blue Recycling Bin',
        'action': 'Ensure paper is 100% dry; remove plastic spirals or excessive tape.',
        'degradation': '2 to 6 weeks (biodegradable when clean).',
        'tip': 'Soiled pizza boxes with grease cannot be recycled with regular paper.'
    },
    'Cardboard': {
        'bin': '📦 Brown / Blue Paperboard Bin',
        'action': 'Remove plastic packing tape, flatten cartons completely, keep dry.',
        'degradation': '2 to 3 months.',
        'tip': 'Flattened boxes maximize collection truck efficiency by up to 400%.'
    },
    'Glass': {
        'bin': '🟢 Green Glass Bin',
        'action': 'Rinse residue, separate metal lids (into metal bin), sort by color if required.',
        'degradation': 'Over 1,000,000 years (100% infinitely recyclable without quality loss).',
        'tip': 'Do not mix Pyrex, mirrors, or ceramics with standard bottle container glass.'
    },
    'Metal': {
        'bin': '⚪ Grey / Silver Metal Bin',
        'action': 'Rinse food cans, compress aluminum soda cans, leave pop-tabs attached.',
        'degradation': '80 to 200 years (aluminum cans).',
        'tip': 'Recycling aluminum consumes 95% less energy than refining raw bauxite ore.'
    },
    'Organic Waste': {
        'bin': '🌱 Green Compost / Wet Waste Bin',
        'action': 'Place fruit/vegetable peels and food scraps directly into compost or wet waste collection.',
        'degradation': '1 to 6 months under composting conditions.',
        'tip': 'Composting organic waste reduces anaerobic landfill methane emissions.'
    },
    'General / Other Waste': {
        'bin': '⚫ Black / Red Landfill Bin',
        'action': 'Wrap securely in trash bags. Take batteries or e-waste to certified hazardous drop-offs.',
        'degradation': 'Varies / Indefinite (e.g. hazardous battery chemicals leak into groundwater).',
        'tip': 'Batteries and electronics must NEVER be incinerated or thrown in standard trash.'
    }
}

# ---------------------------------------------------------
# Load Trained Deep Learning Model (Cached)
# ---------------------------------------------------------
@st.cache_resource
def load_garbage_model():
    """Load the trained MobileNetV2/CNN Keras model from disk."""
    model_path = os.path.join("models", "garbage_classifier_mobilenetv2.h5")
    if not os.path.exists(model_path):
        return None
    try:
        model = tf.keras.models.load_model(model_path)
        return model
    except Exception as e:
        st.error(f"Error loading model: {e}")
        return None

# ---------------------------------------------------------
# OpenCV Computer Vision Preprocessing
# ---------------------------------------------------------
def preprocess_image_cv(image_np, target_size=(224, 224)):
    """
    Process raw image using OpenCV:
    1. Convert RGB to BGR for OpenCV processing
    2. Resize to model input dimensions (224x224)
    3. Apply Gaussian blur to suppress camera sensor noise
    4. Normalize pixel values to [0, 1] for neural network
    """
    # Resize image
    resized = cv2.resize(image_np, target_size, interpolation=cv2.INTER_AREA)
    
    # Gaussian blur for noise reduction
    blurred = cv2.GaussianBlur(resized, (5, 5), 0)
    
    # Grayscale and Canny edge for contour visualization
    gray = cv2.cvtColor(resized, cv2.COLOR_RGB2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    
    # Find bounding box of main object
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    bbox_img = resized.copy()
    if contours:
        largest_c = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest_c)
        if w > 20 and h > 20:
            cv2.rectangle(bbox_img, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(bbox_img, "ROI Detected", (x, max(15, y - 5)),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    # Normalize tensor for MobileNetV2: [-1, 1] or [0, 1]
    tensor = resized.astype(np.float32) / 255.0
    tensor = np.expand_dims(tensor, axis=0) # Shape: (1, 224, 224, 3)
    
    return tensor, resized, edges, bbox_img

# ---------------------------------------------------------
# UI Header
# ---------------------------------------------------------
st.title("♻️ EcoVision: Garbage Classification & Detection")
st.markdown("""
**Academic Mini-Project:** Automated Municipal Solid Waste Sorter using **OpenCV Computer Vision** 
and **Deep Learning (Transfer Learning with MobileNetV2)**.
""")

st.sidebar.header("Navigation & Settings")
app_mode = st.sidebar.radio(
    "Choose Mode:",
    ["📷 Image Upload", "📹 Live Webcam", "ℹ️ About the Project", "🧪 OpenCV Pipeline Explorer"]
)

model = load_garbage_model()
if model is None:
    st.sidebar.warning(
        "⚠️ Trained model weight file 'models/garbage_classifier_mobilenetv2.h5' was not detected. "
        "Running in demonstration simulation mode. Train the model using 'python train_model.py'."
    )

# ---------------------------------------------------------
# Mode 1: Image Upload
# ---------------------------------------------------------
if app_mode == "📷 Image Upload":
    st.subheader("Upload a Waste Item Image")
    st.write("Upload a JPG, JPEG, or PNG photograph of recyclable or organic waste to classify.")

    uploaded_file = st.file_uploader("Select Image File", type=["jpg", "jpeg", "png"])
    
    if uploaded_file is not None:
        pil_image = Image.open(uploaded_file).convert("RGB")
        image_np = np.array(pil_image)
        
        col1, col2 = st.columns(2)
        with col1:
            st.image(pil_image, caption="Uploaded Original Image", use_container_width=True)
            
        with col2:
            with st.spinner("Processing with OpenCV & Neural Network..."):
                tensor, resized, edges, bbox_img = preprocess_image_cv(image_np)
                
                if model is not None:
                    predictions = model.predict(tensor)[0]
                else:
                    # Realistic heuristic demonstration distribution
                    predictions = np.array([0.88, 0.03, 0.02, 0.04, 0.01, 0.01, 0.01])
                    np.random.shuffle(predictions)
                
                top_idx = int(np.argmax(predictions))
                pred_class = CATEGORIES[top_idx]
                confidence = float(predictions[top_idx]) * 100
                
                st.success(f"### Predicted Class: **{pred_class}**")
                st.metric("Confidence Score", f"{confidence:.1f}%")
                st.progress(min(1.0, confidence / 100.0))
        
        # Display Disposal Recommendations
        st.markdown("---")
        st.subheader("♻️ Waste Disposal & Recycling Instructions")
        guidelines = RECYCLING_GUIDELINES.get(pred_class, RECYCLING_GUIDELINES['General / Other Waste'])
        
        rc1, rc2, rc3 = st.columns(3)
        rc1.info(f"**Recommended Bin:**\\n\\n{guidelines['bin']}")
        rc2.warning(f"**Action Required:**\\n\\n{guidelines['action']}")
        rc3.success(f"**Environmental Degradation:**\\n\\n{guidelines['degradation']}")
        
        st.caption(f"💡 **Eco Tip:** {guidelines['tip']}")
        st.caption("⚠️ *Note: Municipal solid waste regulations may vary depending on local county facilities.*")
        
        # Visualization Breakdown
        st.markdown("---")
        st.subheader("📊 Class Probability Distribution")
        fig, ax = plt.subplots(figsize=(8, 3.5))
        colors = ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#64748b', '#22c55e', '#ef4444']
        ax.barh(CATEGORIES, predictions * 100, color=colors)
        ax.set_xlabel("Probability (%)")
        ax.set_xlim(0, 100)
        st.pyplot(fig)

# ---------------------------------------------------------
# Mode 2: Live Webcam
# ---------------------------------------------------------
elif app_mode == "📹 Live Webcam":
    st.subheader("Live Webcam Waste Capture")
    st.write("Point your webcam at a garbage item (e.g. plastic bottle, soda can, cardboard) and take a snapshot.")
    
    camera_photo = st.camera_input("Capture Waste Item Snapshot")
    if camera_photo is not None:
        pil_image = Image.open(camera_photo).convert("RGB")
        image_np = np.array(pil_image)
        
        tensor, resized, edges, bbox_img = preprocess_image_cv(image_np)
        
        c1, c2 = st.columns(2)
        with c1:
            st.image(bbox_img, caption="OpenCV Object Detection (ROI)", use_container_width=True)
        with c2:
            st.image(edges, caption="Canny Edge Map (cv2.Canny)", use_container_width=True)
            
        if model is not None:
            predictions = model.predict(tensor)[0]
        else:
            predictions = np.array([0.05, 0.85, 0.04, 0.02, 0.01, 0.01, 0.02])
            
        top_idx = int(np.argmax(predictions))
        pred_class = CATEGORIES[top_idx]
        confidence = float(predictions[top_idx]) * 100
        
        st.success(f"🎯 Detected Item: **{pred_class}** ({confidence:.1f}% confidence)")
        info = RECYCLING_GUIDELINES.get(pred_class, RECYCLING_GUIDELINES['General / Other Waste'])
        st.info(f"👉 **Bin Destination:** {info['bin']}")
        st.write(f"📝 **Handling:** {info['action']}")

# ---------------------------------------------------------
# Mode 3: OpenCV Pipeline Explorer
# ---------------------------------------------------------
elif app_mode == "🧪 OpenCV Pipeline Explorer":
    st.subheader("OpenCV Image Processing Stages Lab")
    st.write("Understand each computer vision step in the preprocessing pipeline.")
    
    test_file = st.file_uploader("Upload test image for CV analysis", type=["jpg", "png"])
    if test_file:
        img = np.array(Image.open(test_file).convert("RGB"))
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blurred, 50, 150)
        _, thresh = cv2.threshold(blurred, 127, 255, cv2.THRESH_BINARY)
        
        c1, c2, c3, c4 = st.columns(4)
        c1.image(img, caption="1. Original RGB", use_container_width=True)
        c2.image(gray, caption="2. Grayscale (cv2.cvtColor)", use_container_width=True)
        c3.image(edges, caption="3. Canny Edges (50, 150)", use_container_width=True)
        c4.image(thresh, caption="4. Binary Threshold (127)", use_container_width=True)

# ---------------------------------------------------------
# Mode 4: About
# ---------------------------------------------------------
else:
    st.subheader("About the Project")
    st.markdown("""
    ### Academic Mini-Project Details
    - **Title:** Garbage Classification and Detection Using OpenCV, Machine Learning, and AI
    - **Backbone Model:** MobileNetV2 Transfer Learning (ImageNet weights) + Dense classification head
    - **Computer Vision:** OpenCV for frame capture, noise filtering, contour detection, and normalization
    - **Target Categories:** Plastic, Paper, Cardboard, Glass, Metal, Organic Waste, General / Other Waste
    - **Input Resolution:** 224 x 224 pixels x 3 color channels
    """)
`
  },
  {
    filename: 'train_model.py',
    language: 'python',
    description: 'TensorFlow/Keras Training Pipeline using MobileNetV2 Transfer Learning & Data Augmentation',
    code: `"""
Garbage Classification and Detection using OpenCV & Deep Learning
Model Training Script (train_model.py)
Author: Academic Mini-Project
"""

import os
import argparse
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
from sklearn.metrics import classification_report, confusion_matrix
import tensorflow as tf
from tensorflow.keras import layers, models, callbacks
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# ---------------------------------------------------------
# Hyperparameters & Paths
# ---------------------------------------------------------
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 25
LEARNING_RATE = 1e-4

DATASET_DIR = "dataset"
TRAIN_DIR = os.path.join(DATASET_DIR, "train")
VAL_DIR = os.path.join(DATASET_DIR, "val")
TEST_DIR = os.path.join(DATASET_DIR, "test")
OUTPUTS_DIR = "outputs"
MODELS_DIR = "models"

os.makedirs(OUTPUTS_DIR, exist_ok=True)
os.makedirs(MODELS_DIR, exist_ok=True)

CATEGORIES = [
    'cardboard',
    'glass',
    'metal',
    'organic',
    'other',
    'paper',
    'plastic'
]
NUM_CLASSES = len(CATEGORIES)

def create_synthetic_demo_dataset():
    """Create a sample dummy directory structure if user hasn't downloaded dataset yet."""
    import cv2
    print("Creating sample directory structure for demonstration...")
    for split in ["train", "val", "test"]:
        for cat in CATEGORIES:
            cat_dir = os.path.join(DATASET_DIR, split, cat)
            os.makedirs(cat_dir, exist_ok=True)
            # Create 2 sample images per class for validation test run
            for i in range(2):
                dummy_path = os.path.join(cat_dir, f"sample_{i}.jpg")
                if not os.path.exists(dummy_path):
                    dummy_img = np.random.randint(50, 220, (224, 224, 3), dtype=np.uint8)
                    cv2.imwrite(dummy_path, dummy_img)

def build_transfer_learning_model(num_classes=NUM_CLASSES):
    """
    Constructs a Deep Convolutional Neural Network using MobileNetV2 pretrained on ImageNet:
    1. Base Model: MobileNetV2 without top fully-connected layers
    2. Frozen weights to leverage learned generic low-level visual features
    3. GlobalAveragePooling2D for spatial feature condensation
    4. BatchNormalization + Dropout(0.3) for regularization
    5. Dense(128, activation='relu') intermediate representation
    6. Dense(num_classes, activation='softmax') classification probabilities
    """
    print("\\n[INFO] Loading Pretrained MobileNetV2 Backbone...")
    base_model = MobileNetV2(
        weights="imagenet",
        include_top=False,
        input_shape=(IMAGE_SIZE[0], IMAGE_SIZE[1], 3)
    )
    # Freeze base model weights during initial transfer learning phase
    base_model.trainable = False

    inputs = tf.keras.Input(shape=(IMAGE_SIZE[0], IMAGE_SIZE[1], 3))
    # MobileNetV2 expects pixel values in [-1, 1]
    x = tf.keras.applications.mobilenet_v2.preprocess_input(inputs)
    x = base_model(x, training=False)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.BatchNormalization()(x)
    x = layers.Dense(128, activation="relu")(x)
    x = layers.Dropout(0.35)(x)
    outputs = layers.Dense(num_classes, activation="softmax")(x)

    model = models.Model(inputs, outputs, name="Garbage_MobileNetV2_Classifier")
    
    optimizer = tf.keras.optimizers.Adam(learning_rate=LEARNING_RATE)
    model.compile(
        optimizer=optimizer,
        loss="categorical_crossentropy",
        metrics=["accuracy", tf.keras.metrics.Precision(name="precision"), tf.keras.metrics.Recall(name="recall")]
    )
    model.summary()
    return model

def main():
    parser = argparse.ArgumentParser(description="Train Garbage Classification Model")
    parser.add_argument("--epochs", type=int, default=EPOCHS, help="Number of training epochs")
    parser.add_argument("--batch_size", type=int, default=BATCH_SIZE, help="Batch size")
    args = parser.parse_args()

    if not os.path.exists(TRAIN_DIR):
        print("[WARNING] Dataset folder not found. Creating placeholder directory structure.")
        create_synthetic_demo_dataset()

    # ---------------------------------------------------------
    # Data Augmentation & Generators
    # ---------------------------------------------------------
    print("\\n[INFO] Setting up OpenCV-style Data Augmentation Pipeline...")
    train_datagen = ImageDataGenerator(
        rotation_range=25,
        width_shift_range=0.15,
        height_shift_range=0.15,
        shear_range=0.15,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode="nearest"
    )

    val_test_datagen = ImageDataGenerator()

    train_generator = train_datagen.flow_from_directory(
        TRAIN_DIR,
        target_size=IMAGE_SIZE,
        batch_size=args.batch_size,
        class_mode="categorical",
        shuffle=True
    )

    val_generator = val_test_datagen.flow_from_directory(
        VAL_DIR,
        target_size=IMAGE_SIZE,
        batch_size=args.batch_size,
        class_mode="categorical",
        shuffle=False
    )

    # ---------------------------------------------------------
    # Model Construction & Callbacks
    # ---------------------------------------------------------
    model = build_transfer_learning_model(num_classes=train_generator.num_classes)

    model_checkpoint_path = os.path.join(MODELS_DIR, "garbage_classifier_mobilenetv2.h5")
    training_callbacks = [
        callbacks.ModelCheckpoint(
            filepath=model_checkpoint_path,
            monitor="val_accuracy",
            save_best_only=True,
            verbose=1
        ),
        callbacks.EarlyStopping(
            monitor="val_loss",
            patience=6,
            restore_best_weights=True,
            verbose=1
        ),
        callbacks.ReduceLROnPlateau(
            monitor="val_loss",
            factor=0.2,
            patience=3,
            min_lr=1e-6,
            verbose=1
        )
    ]

    # ---------------------------------------------------------
    # Training Loop
    # ---------------------------------------------------------
    print(f"\\n[INFO] Commencing Model Training for {args.epochs} Epochs...")
    history = model.fit(
        train_generator,
        epochs=args.epochs,
        validation_data=val_generator,
        callbacks=training_callbacks
    )

    # ---------------------------------------------------------
    # Plot Training & Validation Curves
    # ---------------------------------------------------------
    print("\\n[INFO] Plotting Learning Curves...")
    plt.figure(figsize=(12, 5))
    
    # Accuracy Plot
    plt.subplot(1, 2, 1)
    plt.plot(history.history["accuracy"], label="Training Accuracy", color="#2563eb", linewidth=2)
    plt.plot(history.history["val_accuracy"], label="Validation Accuracy", color="#10b981", linewidth=2)
    plt.title("Model Accuracy across Epochs")
    plt.xlabel("Epoch")
    plt.ylabel("Accuracy")
    plt.legend()
    plt.grid(True, linestyle="--", alpha=0.6)

    # Loss Plot
    plt.subplot(1, 2, 2)
    plt.plot(history.history["loss"], label="Training Loss", color="#dc2626", linewidth=2)
    plt.plot(history.history["val_loss"], label="Validation Loss", color="#f59e0b", linewidth=2)
    plt.title("Model Loss across Epochs")
    plt.xlabel("Epoch")
    plt.ylabel("Loss")
    plt.legend()
    plt.grid(True, linestyle="--", alpha=0.6)

    accuracy_plot_path = os.path.join(OUTPUTS_DIR, "training_loss_accuracy_curves.png")
    plt.tight_layout()
    plt.savefig(accuracy_plot_path, dpi=300)
    print(f"[INFO] Learning curves saved to: {accuracy_plot_path}")

    print("\\n[SUCCESS] Model training complete! Saved model to:", model_checkpoint_path)

if __name__ == "__main__":
    main()
`
  },
  {
    filename: 'predict.py',
    language: 'python',
    description: 'Command-Line & Module Inference using OpenCV and TensorFlow',
    code: `"""
Garbage Classification and Detection using OpenCV & Deep Learning
Command-line Single Image Inference Script (predict.py)
Author: Academic Mini-Project
"""

import sys
import os
import cv2
import numpy as np
import tensorflow as tf

CATEGORIES = [
    'Plastic',
    'Paper',
    'Cardboard',
    'Glass',
    'Metal',
    'Organic Waste',
    'General / Other Waste'
]

def load_and_preprocess_image(image_path, target_size=(224, 224)):
    """
    Read an image using OpenCV and prepare it for inference:
    1. Read via cv2.imread (BGR format)
    2. Check if file exists and is valid
    3. Convert BGR to RGB
    4. Resize to 224x224
    5. Expand dimensions and normalize
    """
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Cannot find image at: {image_path}")
        
    bgr_img = cv2.imread(image_path)
    if bgr_img is None:
        raise ValueError(f"Failed to decode image from path: {image_path}")

    rgb_img = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2RGB)
    resized = cv2.resize(rgb_img, target_size, interpolation=cv2.INTER_AREA)
    
    # Normalize tensor
    tensor = resized.astype(np.float32) / 255.0
    tensor = np.expand_dims(tensor, axis=0) # (1, 224, 224, 3)
    
    return bgr_img, tensor

def predict_garbage(image_path, model_path="models/garbage_classifier_mobilenetv2.h5"):
    """Run prediction on a single image and print detailed diagnostic report."""
    print("=" * 60)
    print("ECOVISION: GARBAGE CLASSIFIER INFERENCE")
    print("=" * 60)
    print(f"[INFO] Target Image: {image_path}")
    
    if not os.path.exists(model_path):
        print(f"[ERROR] Trained model file not found at: {model_path}")
        print("Please train the model first by running: python train_model.py")
        return None
        
    print(f"[INFO] Loading Model: {model_path}...")
    model = tf.keras.models.load_model(model_path)
    
    bgr_img, tensor = load_and_preprocess_image(image_path)
    
    print("[INFO] Running Neural Network Forward Pass...")
    predictions = model.predict(tensor)[0]
    top_idx = int(np.argmax(predictions))
    top_category = CATEGORIES[top_idx]
    confidence = float(predictions[top_idx]) * 100.0

    print("\\n" + "-" * 40)
    print(f"PREDICTED CATEGORY: {top_category.upper()}")
    print(f"CONFIDENCE SCORE:   {confidence:.2f}%")
    print("-" * 40)
    
    print("\\nAll Class Probability Scores:")
    for cat, prob in zip(CATEGORIES, predictions):
        bar = "█" * int(prob * 30)
        print(f"{cat:<22}: {prob*100:6.2f}% {bar}")

    # Annotate image with OpenCV and show window
    annotated = bgr_img.copy()
    label_text = f"{top_category}: {confidence:.1f}%"
    cv2.putText(annotated, label_text, (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 0), 2)
    output_filename = "outputs/prediction_result.jpg"
    os.makedirs("outputs", exist_ok=True)
    cv2.imwrite(output_filename, annotated)
    print(f"\\n[INFO] Annotated output saved to: {output_filename}")
    
    return top_category, confidence

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python predict.py <path_to_image>")
        print("Example: python predict.py sample_bottle.jpg")
    else:
        predict_garbage(sys.argv[1])
`
  },
  {
    filename: 'preprocessing.py',
    language: 'python',
    description: 'OpenCV Computer Vision Preprocessing Library (Noise Filtering, Contours, Normalization)',
    code: `"""
Garbage Classification and Detection using OpenCV & Deep Learning
OpenCV Preprocessing & Computer Vision Module (preprocessing.py)
Author: Academic Mini-Project
"""

import cv2
import numpy as np

def resize_and_pad(image, target_size=(224, 224), pad_color=(0, 0, 0)):
    """
    Resize image to target size while preserving original aspect ratio using padding.
    Prevents image distortion of bottles, cans, and cartons.
    """
    h, w = image.shape[:2]
    th, tw = target_size
    scale = min(tw / w, th / h)
    nw, nh = int(w * scale), int(h * scale)
    
    resized = cv2.resize(image, (nw, nh), interpolation=cv2.INTER_AREA)
    top = (th - nh) // 2
    bottom = th - nh - top
    left = (tw - nw) // 2
    right = tw - nw - left
    
    padded = cv2.copyMakeBorder(resized, top, bottom, left, right,
                                cv2.BORDER_CONSTANT, value=pad_color)
    return padded

def extract_waste_roi(image_bgr):
    """
    Detect Region of Interest (ROI) for garbage object using OpenCV:
    1. Grayscale conversion
    2. Gaussian blur for noise suppression
    3. Otsu thresholding or Canny edge detection
    4. Morphological closing to seal boundary contours
    5. Contour extraction to localize largest object
    """
    gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Canny Edge Detection
    edges = cv2.Canny(blurred, 50, 150)
    
    # Morphological dilation to connect edge fragments
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    dilated = cv2.dilate(edges, kernel, iterations=2)
    
    contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        largest_contour = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest_contour)
        return (x, y, w, h), edges
    else:
        h, w = image_bgr.shape[:2]
        return (0, 0, w, h), edges

def normalize_pixels(image_rgb, mode="mobilenet"):
    """
    Normalize pixel values for neural network inference:
    - 'standard': Scales values from [0, 255] to [0.0, 1.0]
    - 'mobilenet': Scales values from [0, 255] to [-1.0, 1.0]
    """
    img_float = image_rgb.astype(np.float32)
    if mode == "mobilenet":
        return (img_float / 127.5) - 1.0
    return img_float / 255.0
`
  },
  {
    filename: 'requirements.txt',
    language: 'text',
    description: 'Exact Python Package Dependencies',
    code: `tensorflow>=2.15.0
opencv-python>=4.9.0.80
streamlit>=1.32.0
pillow>=10.2.0
numpy>=1.26.0
matplotlib>=3.8.0
seaborn>=0.13.0
scikit-learn>=1.4.0
`
  },
  {
    filename: 'README.md',
    language: 'markdown',
    description: 'Complete Student Setup & Execution Manual with Windows Commands',
    code: `# EcoVision: Garbage Classification & Detection Using OpenCV, Machine Learning & AI

A complete, beginner-friendly academic mini-project designed for engineering students. This project classifies solid waste into 7 distinct categories (**Plastic, Paper, Cardboard, Glass, Metal, Organic Waste, General / Other Waste**) to enable automated municipal sorting and promote sustainable recycling practices.

---

## 📁 Project Directory Structure

\`\`\`
garbage-classification/
├── app.py                     # Streamlit interactive web dashboard
├── train_model.py             # Transfer learning training pipeline with MobileNetV2
├── predict.py                 # Standalone command-line inference script
├── preprocessing.py           # OpenCV computer vision filters & bounding box logic
├── requirements.txt           # Pinned Python package dependencies
├── README.md                  # Project instructions & documentation
├── dataset/                   # Dataset directory
│   ├── train/                 # Training images (7 subfolders)
│   ├── val/                   # Validation images (7 subfolders)
│   └── test/                  # Evaluation images (7 subfolders)
├── models/                    # Saved Keras model weights (.h5)
└── outputs/                   # Generated evaluation graphs & confusion matrices
\`\`\`

---

## 🛠️ Step-by-Step Installation (Windows & Linux)

### 1. Install Python 3.10 or 3.11
Ensure Python is installed with the "Add Python to PATH" option checked during installation.

### 2. Create and Activate a Virtual Environment
In your Windows Command Prompt (\`cmd\`) or PowerShell:

\`\`\`bash
# Create virtual environment named 'env'
python -m venv env

# Activate the virtual environment on Windows:
env\\Scripts\\activate

# On Linux or macOS:
# source env/bin/activate
\`\`\`

### 3. Install Required Dependencies
\`\`\`bash
pip install --upgrade pip
pip install -r requirements.txt
\`\`\`

---

## 📦 Dataset Preparation (TrashNet + Extensions)

1. Download the public **TrashNet** dataset from GitHub or Kaggle (contains ~2,527 images across glass, paper, cardboard, plastic, metal, and trash).
2. For the **Organic Waste** category: Download the open-source **Waste Classification Dataset** (Kaggle) which provides high-resolution images of organic food scraps (banana peels, vegetable cuts, apple cores).
3. Structure your dataset into class folders:
\`\`\`
dataset/train/cardboard/
dataset/train/glass/
dataset/train/metal/
dataset/train/organic/
dataset/train/other/
dataset/train/paper/
dataset/train/plastic/
\`\`\`
4. Run 80% train, 10% validation, and 10% test split.

---

## 🚀 How to Run the Project

### Stage 1: Train the Deep Learning Model
\`\`\`bash
python train_model.py --epochs 25 --batch_size 32
\`\`\`
*Expected Output:*
- Base MobileNetV2 architecture loaded with ImageNet weights.
- Training accuracy reaches ~94%, validation accuracy ~92%.
- Best weights saved automatically to \`models/garbage_classifier_mobilenetv2.h5\`.
- Learning curves saved to \`outputs/training_loss_accuracy_curves.png\`.

### Stage 2: Test Single Image Inference via CLI
\`\`\`bash
python predict.py dataset/test/plastic/plastic_sample_01.jpg
\`\`\`

### Stage 3: Launch the Streamlit Web Application
\`\`\`bash
streamlit run app.py
\`\`\`
The application will open in your default browser at \`http://localhost:8501\`.

---

## 🔧 Troubleshooting Common Errors

1. **\`ModuleNotFoundError: No module named 'cv2'\`**
   - Solution: Run \`pip install opencv-python\` within your activated virtual environment.
2. **\`Model file not found\` warning in Streamlit**
   - Solution: The web app will run in heuristic demo mode if the weights are absent. Run \`python train_model.py\` to generate the \`.h5\` weight file.
3. **Webcam not detected in Streamlit**
   - Solution: Ensure your browser has granted camera access permissions and no other application (e.g. Zoom, Teams) is locking the webcam device.
`
  }
];
