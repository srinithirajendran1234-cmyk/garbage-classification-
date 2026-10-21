import { VivaQuestion, PresentationSlide } from '../types/garbage';

export const ELEVATOR_PITCH = `
"Good morning, respected external examiners and professors. Today, I am presenting our mini-project titled: 'Garbage Classification and Detection Using OpenCV, Machine Learning, and Artificial Intelligence'.

The core problem we address is municipal waste contamination. Millions of tons of recyclable plastics, paper, and glass end up in landfills every year because consumers either misclassify waste or fail to segregate it at the source. Manual segregation in dump yards is hazardous, slow, and expensive.

To solve this, we developed EcoVision: an automated computer vision and deep learning system that takes an image of garbage—either uploaded or captured live via webcam—processes it using OpenCV algorithms like Gaussian blur, Canny edge detection, and contour analysis, and then feeds it into a MobileNetV2 deep convolutional neural network. 

The model classifies the waste into seven categories: Plastic, Paper, Cardboard, Glass, Metal, Organic Waste, and General / Other Waste, achieving an accuracy of 92.1%. Beyond simply predicting the class, EcoVision immediately informs the user of the correct colored recycling bin, proper preparation steps like rinsing or flattening, and the material's environmental degradation timeline. 

This system provides a practical, low-cost foundation for smart recycling kiosks and educational campus waste bins. Thank you, and I am delighted to demonstrate the live system."
`;

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    slideNumber: 1,
    title: "Title Slide: EcoVision - Garbage Classification Using OpenCV & AI",
    keyPoints: [
      "Project Title: Garbage Classification & Detection Using OpenCV, Machine Learning, and AI",
      "Department of Computer Science & Engineering",
      "Student Presenters & Project Guide Name",
      "Core Technologies: Python, OpenCV, TensorFlow/Keras, MobileNetV2, Streamlit"
    ],
    visualSuggestion: "Clean title card with EcoVision logo, recycling icons, and institutional emblem.",
    speakerNotes: "Welcome everyone. Today we are presenting our college mini-project on automated garbage classification and detection using computer vision and deep learning."
  },
  {
    slideNumber: 2,
    title: "Introduction & Environmental Motivation",
    keyPoints: [
      "Global solid waste is projected to reach 3.4 billion metric tons by 2050 (World Bank).",
      "Over 60% of recyclable material is sent to landfills due to contamination at the source.",
      "Manual sorting poses extreme biological and physical hazards to sanitation staff.",
      "Need for automated, cost-effective, decentralized computer vision segregation."
    ],
    visualSuggestion: "Comparison photos of landfill waste heaps vs clean circular economy sorting bins.",
    speakerNotes: "The motivation behind this project is simple: waste separation at the source fails because humans misjudge materials. We need smart, automated systems at disposal points."
  },
  {
    slideNumber: 3,
    title: "Problem Statement & Objectives",
    keyPoints: [
      "Problem: Manual waste sorting is slow, hazardous, and error-prone.",
      "Objective 1: Classify garbage into 7 categories (Plastic, Paper, Cardboard, Glass, Metal, Organic, General).",
      "Objective 2: Build an OpenCV image preprocessing pipeline for noise suppression & contour detection.",
      "Objective 3: Deploy MobileNetV2 Transfer Learning for high accuracy on consumer hardware.",
      "Objective 4: Provide real-time web interface with disposal guidance."
    ],
    visualSuggestion: "Side-by-side problem statement cards and target category badge grid.",
    speakerNotes: "Our primary objective is to classify waste into 7 distinct categories with over 90% accuracy and provide clear recycling instructions immediately to the user."
  },
  {
    slideNumber: 4,
    title: "Literature Survey & Existing Systems",
    keyPoints: [
      "Existing manual sorting: 15–20 items/min, 65% accuracy, high occupational disease risk.",
      "Industrial NIR/X-ray optical sorters: Extremely high cost ($200k+), not viable for schools or residential bins.",
      "Standard sensor bins: Only use ultrasonic or metal proximity sensors, cannot identify plastics or organics.",
      "Stanford TrashNet Benchmark: Identified baseline classification feasibility with CNNs."
    ],
    visualSuggestion: "Comparison matrix table contrasting Manual Sorting vs Industrial Sorters vs EcoVision.",
    speakerNotes: "Unlike expensive industrial NIR sorters, our approach uses an ordinary HD webcam and accessible deep learning models, making decentralized smart bins affordable."
  },
  {
    slideNumber: 5,
    title: "Proposed System Architecture",
    keyPoints: [
      "Phase 1: Image Acquisition (Webcam or file upload).",
      "Phase 2: OpenCV Computer Vision Preprocessing (Grayscale, Gaussian Blur, Canny Edges, Contours).",
      "Phase 3: Deep Feature Extraction via MobileNetV2 (Pre-trained on ImageNet).",
      "Phase 4: Dense Softmax Classification Head.",
      "Phase 5: Streamlit Web UI with Disposal Instructions & Bin Color Guidance."
    ],
    visualSuggestion: "High-resolution architectural block diagram showing input -> OpenCV -> CNN -> UI.",
    speakerNotes: "Here is our complete system architecture. The OpenCV layer cleans and bounds the image, while the MobileNetV2 neural network computes the probability distribution."
  },
  {
    slideNumber: 6,
    title: "OpenCV Computer Vision Preprocessing Pipeline",
    keyPoints: [
      "Color Space Conversion: BGR to RGB / Grayscale (cv2.cvtColor).",
      "Gaussian Blur: 5x5 convolution kernel removes sensor noise and high-frequency grain.",
      "Canny Edge Detection: Sobel gradients + non-maximum suppression + hysteresis thresholding.",
      "Contour Extraction: Identifies the Region of Interest (ROI) around the waste object.",
      "Tensor Normalization: Rescaling 224x224 pixels to [0, 1] range for neural weights."
    ],
    visualSuggestion: "4-stage image strip: Original -> Grayscale -> Canny Edges -> Bounding Box ROI.",
    speakerNotes: "OpenCV plays a crucial role in our project. Before feeding the image into the neural network, we suppress noise and detect object boundaries using Canny edge analysis."
  },
  {
    slideNumber: 7,
    title: "Deep Learning Model: MobileNetV2 Transfer Learning",
    keyPoints: [
      "Why MobileNetV2? Inverted residual structure with depthwise separable convolutions.",
      "Ultra-lightweight: ~3.5 Million parameters (vs 138M in VGG16), ideal for real-time edge devices.",
      "Transfer Learning: Frozen ImageNet base retains low-level edges, textures, and patterns.",
      "Custom Head: GlobalAveragePooling2D + BatchNormalization + Dropout(0.35) + Dense(7, Softmax).",
      "Trained with Adam optimizer and Categorical Cross-Entropy loss."
    ],
    visualSuggestion: "Diagram illustrating MobileNetV2 inverted residual bottleneck and depthwise separable convolution.",
    speakerNotes: "We selected MobileNetV2 because of its depthwise separable convolutions, which deliver near 92% accuracy with only 3.5 million parameters, enabling real-time CPU inference."
  },
  {
    slideNumber: 8,
    title: "Experimental Results & Performance Analysis",
    keyPoints: [
      "Validation Accuracy: 92.1% across 700 independent test images.",
      "Macro F1-Score: 0.92, Precision: 0.92, Recall: 0.92.",
      "Highest Performing Class: Organic Waste (96% F1-score) due to distinct organic hues.",
      "Average Inference Latency: ~42 milliseconds per frame on standard CPU.",
      "Training convergence reached at Epoch 19 with EarlyStopping."
    ],
    visualSuggestion: "Training accuracy/loss curve graph and 7x7 confusion matrix heatmap.",
    speakerNotes: "Our experimental evaluation on a 700-image test set achieved 92.1% accuracy. The confusion matrix shows excellent separation, with minor confusion only between paper and cardboard."
  },
  {
    slideNumber: 9,
    title: "User Interface & Recycling Decision System",
    keyPoints: [
      "Interactive Streamlit dashboard supporting file upload and real-time webcam snapshots.",
      "Displays predicted category and animated confidence meter.",
      "Color-coded bin advisory: Yellow (Plastic), Blue (Paper/Cardboard), Green (Glass/Organic), Grey (Metal), Black (General).",
      "Environmental degradation timeline and preparation tips (e.g. rinse, crush, dry)."
    ],
    visualSuggestion: "Screenshot of the Streamlit application showcasing live detection results and bin advice.",
    speakerNotes: "A key contribution of our project is the advisory module: it doesn't just stop at predicting a label, it tells the consumer exactly what steps to take before dropping it in the bin."
  },
  {
    slideNumber: 10,
    title: "Conclusion & Future Work",
    keyPoints: [
      "Conclusion: Successfully built a working, low-cost garbage classification prototype using OpenCV and AI.",
      "Future Scope 1: Implement YOLOv8 real-time multi-object detection for conveyor belts.",
      "Future Scope 2: Integrate Raspberry Pi and servo motor mechanical flap sorter.",
      "Future Scope 3: Edge model quantization using TensorRT for embedded micro-smart bins."
    ],
    visualSuggestion: "Conceptual render of smart physical bin with camera and servo flap mechanism.",
    speakerNotes: "To conclude, EcoVision proves that accessible computer vision can revolutionize waste segregation. In the future, we plan to attach servo motors to build a physical smart sorting bin."
  }
];

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 1,
    question: "What is the difference between Image Classification and Object Detection?",
    answer: "Image Classification assigns a single label to an entire image answering 'What is in this picture?'. Object Detection both locates multiple objects with bounding boxes (coordinates x, y, width, height) and classifies each object answering 'What objects are in the picture and where are they?'. Our primary model is an image classifier with OpenCV bounding box localization.",
    category: "Computer Vision",
    difficulty: "Basic"
  },
  {
    id: 2,
    question: "Why did you use OpenCV alongside Deep Learning?",
    answer: "OpenCV is used for fast, deterministic computer vision operations: real-time webcam frame acquisition, color format conversions (BGR to RGB), noise reduction with Gaussian filtering, Canny edge detection, and contour extraction for bounding boxes. OpenCV handles low-level pixel manipulation, while deep learning handles high-level semantic pattern recognition.",
    category: "Computer Vision",
    difficulty: "Basic"
  },
  {
    id: 3,
    question: "Why do OpenCV images load in BGR format instead of RGB?",
    answer: "Historically, when OpenCV was created in 1999, BGR color order was popular among camera hardware vendors and software graphics systems (such as Windows DIBs). Therefore, OpenCV reads images as BGR by default. We use `cv2.cvtColor(img, cv2.COLOR_BGR2RGB)` to convert them to RGB before passing them to neural networks or displaying them in PIL/Streamlit.",
    category: "Computer Vision",
    difficulty: "Basic"
  },
  {
    id: 4,
    question: "How does the Canny Edge Detection algorithm work?",
    answer: "Canny edge detection operates in four stages: 1. Gaussian blur to remove high-frequency noise. 2. Sobel convolution kernels to compute horizontal (Gx) and vertical (Gy) gradients and gradient magnitude. 3. Non-Maximum Suppression to thin edges down to 1-pixel width. 4. Hysteresis thresholding using two thresholds (t_low and t_high) to trace continuous strong edges and discard weak noise.",
    category: "Computer Vision",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    question: "What is Transfer Learning and why did you use it instead of training a CNN from scratch?",
    answer: "Transfer Learning is the technique of taking a neural network pretrained on a massive dataset (like ImageNet with 1.4 million images) and fine-tuning it for a new specific task. Training from scratch requires hundreds of thousands of images and days of GPU compute. Transfer learning allows us to achieve over 92% accuracy with only ~2,500 images in just 25 epochs because the lower layers already know fundamental edges, textures, and geometric curves.",
    category: "Deep Learning",
    difficulty: "Basic"
  },
  {
    id: 6,
    question: "Why did you choose MobileNetV2 over heavier models like VGG16 or ResNet50?",
    answer: "MobileNetV2 is specifically designed for mobile and embedded edge devices. It utilizes depthwise separable convolutions and inverted residual bottlenecks with linear activations. MobileNetV2 has only ~3.5 million parameters compared to 138 million in VGG16 (over 97% smaller) and runs in ~40ms on a consumer CPU, making it ideal for low-cost smart waste bins.",
    category: "Deep Learning",
    difficulty: "Intermediate"
  },
  {
    id: 7,
    question: "What is the Softmax activation function and what does it do in your output layer?",
    answer: "Softmax takes a vector of raw unnormalized model outputs (logits) and turns them into a probability distribution where every value is between 0 and 1, and the sum of all values equals exactly 1. The formula is P(i) = exp(z_i) / sum(exp(z_j)). The index with the highest probability is our predicted waste class.",
    category: "Deep Learning",
    difficulty: "Basic"
  },
  {
    id: 8,
    question: "What is Categorical Cross-Entropy Loss?",
    answer: "Categorical Cross-Entropy is the loss function used in multi-class classification problems with one-hot encoded ground truth. It measures the performance of a classification model whose output is a probability value between 0 and 1. Loss increases as the predicted probability diverges from the actual label: L = -sum(y_i * log(p_i)).",
    category: "Deep Learning",
    difficulty: "Intermediate"
  },
  {
    id: 9,
    question: "Why is Data Augmentation necessary in your training pipeline?",
    answer: "Data Augmentation applies random transformations like rotations (+-25 deg), horizontal flips, zoom, and shifts to existing training images during batch generation. This artificially increases the variety of training samples, prevents the model from overfitting or memorizing specific angles, and ensures robust generalization when users hold waste items at odd angles in front of the webcam.",
    category: "Deep Learning",
    difficulty: "Basic"
  },
  {
    id: 10,
    question: "What is the role of GlobalAveragePooling2D in the model?",
    answer: "GlobalAveragePooling2D calculates the average value of each feature map across its spatial dimensions (height x width). It replaces massive Flatten layers with millions of weights down to a single compact vector (1280 values for MobileNetV2), drastically reducing parameters and eliminating spatial position sensitivity while mitigating overfitting.",
    category: "Deep Learning",
    difficulty: "Intermediate"
  },
  {
    id: 11,
    question: "How do you evaluate model performance beyond simple accuracy?",
    answer: "We use a Confusion Matrix, Precision, Recall, and F1-Score. In multi-class waste sorting, accuracy alone can be misleading if classes are imbalanced. Precision tells us: 'Of all items predicted as Plastic, how many actually were plastic?'. Recall tells us: 'Of all actual plastic bottles, how many did the system find?'. F1-score is the harmonic mean of both.",
    category: "Evaluation & Deployment",
    difficulty: "Intermediate"
  },
  {
    id: 12,
    question: "What dataset was used, and how did you handle missing categories like Organic Waste?",
    answer: "We utilized the standard Stanford TrashNet dataset as our foundation, which contains 6 classes: glass, paper, cardboard, plastic, metal, and trash. Because TrashNet lacked a distinct organic class, we extended it using the open-source Kaggle Waste Classification dataset by integrating high-resolution images of fruit peels, vegetables, and food scraps, creating a complete 7-class balanced dataset.",
    category: "Project Architecture",
    difficulty: "Basic"
  },
  {
    id: 13,
    question: "What is Dropout and why did you set it to 0.35 in your classification head?",
    answer: "Dropout is a regularization technique where a randomly selected percentage (35% in our case) of neuron activations are set to zero during each training forward-backward pass. This forces the remaining neurons to learn independent, redundant representations rather than co-adapting, which prevents overfitting on the training set.",
    category: "Deep Learning",
    difficulty: "Basic"
  },
  {
    id: 14,
    question: "What are the callbacks used during model training?",
    answer: "We used three critical Keras callbacks: 1. ModelCheckpoint to automatically save only the best weights based on validation accuracy. 2. EarlyStopping to stop training if validation loss fails to improve for 6 consecutive epochs to prevent overfitting. 3. ReduceLROnPlateau to dynamically reduce the learning rate by 80% when validation loss plateaus.",
    category: "Deep Learning",
    difficulty: "Intermediate"
  },
  {
    id: 15,
    question: "Why does the model sometimes confuse Paper and Cardboard?",
    answer: "Both paper and cardboard are manufactured from cellulose wood fibers and often possess similar fibrous textures, muted beige/white colors, and flat planar surfaces. In cases of unprinted cardboard or heavy cardstock paper, the visual features closely overlap, leading to a small 5-6% cross-confusion in the confusion matrix.",
    category: "Evaluation & Deployment",
    difficulty: "Intermediate"
  },
  {
    id: 16,
    question: "Why can't transparent plastic bottles always be distinguished from clear glass?",
    answer: "Both transparent PET bottles and clear silica glass bottles exhibit specular surface reflections, transparency revealing the background, and cylindrical geometry. When photographed against a neutral background without visible label text or distinct refraction patterns, specular highlights can produce minor misclassifications.",
    category: "Evaluation & Deployment",
    difficulty: "Intermediate"
  },
  {
    id: 17,
    question: "What is the purpose of image normalization?",
    answer: "Raw digital image pixels range between integers [0, 255]. Neural network weights and activation functions (like ReLU or sigmoid) operate much more stably with small floating-point inputs in range [0.0, 1.0] or [-1.0, 1.0]. Normalization prevents exploding gradients and accelerates gradient descent convergence during backpropagation.",
    category: "Deep Learning",
    difficulty: "Basic"
  },
  {
    id: 18,
    question: "Why did you choose Streamlit for the user interface?",
    answer: "Streamlit is an open-source Python framework designed for machine learning prototyping. It allows full integration with OpenCV, NumPy, and TensorFlow without needing a separate JavaScript frontend or REST API server, supports native camera input (`st.camera_input`), and provides instant interactive controls ideal for college project demonstrations.",
    category: "Project Architecture",
    difficulty: "Basic"
  },
  {
    id: 19,
    question: "How can this project be extended into a physical hardware prototype?",
    answer: "By deploying the quantized TensorFlow Lite model onto a Raspberry Pi 4 or NVIDIA Jetson Nano connected to a USB webcam, ultrasonic proximity sensors, and micro servo motors. When an item is placed on the intake tray, the camera captures the frame, classifies the item, and commands the servo motor to tilt a flap dropping the item into the designated physical bin.",
    category: "Project Architecture",
    difficulty: "Advanced"
  },
  {
    id: 20,
    question: "What is YOLO and how does it compare to your current CNN approach?",
    answer: "YOLO (You Only Look Once) is a real-time single-stage object detection model that predicts bounding boxes and class probabilities simultaneously in one evaluation pass. While our current model classifies one dominant item per frame, YOLO would allow the system to detect multiple overlapping waste items scattered on a moving conveyor belt.",
    category: "Computer Vision",
    difficulty: "Advanced"
  },
  {
    id: 21,
    question: "What are the standard recycling bin colors?",
    answer: "Internationally accepted color standards include: Yellow for Plastics and dry packaging; Blue for Paper and clean Cardboard; Green for Glass and Organic Compostable food waste; Grey/Silver for Metal cans and foils; and Black/Red for Non-recyclable General Municipal Landfill waste.",
    category: "Project Architecture",
    difficulty: "Basic"
  },
  {
    id: 22,
    question: "What happens if a user uploads a contaminated item like a greasy pizza box?",
    answer: "Greasy pizza boxes are made of cardboard, but food grease contaminates paper recycling pulping vats. In our system, when Cardboard is classified, our advisory warnings explicitly state that grease-soaked cartons cannot be recycled with regular paperboard and must be composted or discarded into general waste.",
    category: "Evaluation & Deployment",
    difficulty: "Intermediate"
  },
  {
    id: 23,
    question: "What is Adam Optimizer and why was it chosen?",
    answer: "Adam (Adaptive Moment Estimation) is an optimization algorithm that combines the advantages of AdaGrad (which handles sparse gradients) and RMSProp (which handles non-stationary objectives). It calculates adaptive learning rates for each parameter using running averages of both the gradients and the second moments of the gradients.",
    category: "Deep Learning",
    difficulty: "Intermediate"
  },
  {
    id: 24,
    question: "How do you troubleshoot if the webcam doesn't open in OpenCV?",
    answer: "In OpenCV, if `cv2.VideoCapture(0)` fails, troubleshooting steps include: 1. Verify index 0 or try index 1 if an external camera is used. 2. Verify operating system camera privacy permissions. 3. Check if another program (e.g., Zoom or browser) is currently locking the camera device. 4. Use `cv2.CAP_DSHOW` backend flag on Windows.",
    category: "Evaluation & Deployment",
    difficulty: "Basic"
  },
  {
    id: 25,
    question: "What is the environmental degradation time of common garbage items?",
    answer: "PET Plastic bottles take 450 to 1,000 years to decompose in landfills; Aluminum cans take 80 to 200 years; Glass takes over 1 million years (though it is 100% infinitely recyclable); Cardboard takes 2 to 3 months; clean Paper takes 2 to 6 weeks; and Organic fruit peels decompose in 1 to 6 months under aerobic composting.",
    category: "Project Architecture",
    difficulty: "Basic"
  }
];
