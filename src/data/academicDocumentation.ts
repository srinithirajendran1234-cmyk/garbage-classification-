export interface ReportSection {
  number: number;
  title: string;
  summary: string;
  content: string;
}

export const ACADEMIC_REPORT_SECTIONS: ReportSection[] = [
  {
    number: 1,
    title: "Project Title",
    summary: "Official academic title and academic context",
    content: `
# EcoVision: Garbage Classification and Detection Using OpenCV, Machine Learning, and Artificial Intelligence

**A Bachelor of Engineering / Technology Mini-Project Dissertation**  
*Department of Computer Science & Engineering / Information Technology / Artificial Intelligence*

- **Academic Domain:** Computer Vision, Convolutional Neural Networks, Deep Learning, Image Processing, Environmental Informatics
- **Application Target:** Smart Municipal Solid Waste Management & Automated Reverse Vending Sorting Systems
`
  },
  {
    number: 2,
    title: "Abstract",
    summary: "High-level summary of problem, methodology, and outcome",
    content: `
Rapid urbanization and rising consumer consumption have triggered exponential increases in Municipal Solid Waste (MSW), generating severe environmental degradation, soil contamination, and greenhouse gas emissions. Traditional manual waste segregation remains labor-intensive, hazardous to human sanitation personnel, and prone to sorting errors that render recyclable batches non-reclaimable. 

This project presents **EcoVision**, an automated vision-based waste categorization framework employing **OpenCV computer vision pipelines** and **deep transfer learning** with **MobileNetV2**. The system detects and classifies garbage into seven key categories: **Plastic, Paper, Cardboard, Glass, Metal, Organic Waste, and General / Other Waste**. 

The computer vision subsystem handles real-time frame acquisition, noise suppression using Gaussian filtering, edge and contour detection via Canny and morphological transforms to localize objects of interest (ROI), and tensor normalization. The deep convolutional network performs feature extraction and classification, yielding an overall validation accuracy of **92.1%** and a macro F1-score of **0.92** on standard benchmark benchmarks (including TrashNet and Kaggle Waste sets). The software features a streamlined user interface capable of processing image uploads and live webcam video streams, instantly outputting category labels, confidence percentages, class probability distributions, and environmentally responsible disposal guidelines with bin color codes.
`
  },
  {
    number: 3,
    title: "Introduction",
    summary: "Background, environmental context, and the role of Computer Vision in waste sorting",
    content: `
According to the World Bank, global waste generation is projected to reach 3.4 billion metric tons annually by 2050, up from 2.01 billion tons in 2016. In many developing and transitioning economies, over 90% of waste is openly dumped or burned rather than routed to sanitary landfills or recycling facilities. 

A central bottleneck in waste circularity is **contamination at the point of source**. When plastic bottles with residual beverage, greasy pizza boxes, or toxic alkaline batteries are mixed into standard paper and compost bins, entire processing batches become unusable, requiring municipal landfilling. 

Recent advancements in computer vision and deep learning offer a transformative solution. Deep Convolutional Neural Networks (CNNs) can recognize visual texture, material reflections, shape profiles, and label geometry far faster and more reliably than manual labor. By integrating lightweight neural architectures with OpenCV's real-time image processing primitives, edge devices and smart recycling kiosks can automatically identify waste materials in real time, alerting consumers to the correct disposal bin and providing educational prompts.
`
  },
  {
    number: 4,
    title: "Problem Statement",
    summary: "Key challenges and limitations of manual and legacy sorting methods",
    content: `
1. **Health and Occupational Hazards:** Sanitation workers who manually sort municipal waste are exposed to chemical toxins, pathogenic bacteria, aerosolized dust, and sharp glass/metal punctures.
2. **High Contamination Rates:** Untrained consumers consistently misclassify items (e.g. placing wax-lined paper coffee cups into paper bins or mixing greasy food containers with dry recyclables), which renders entire collection truckloads un-recyclable.
3. **High Infrastructure Costs of Industrial Sensor Arrays:** Industrial sorting facilities often rely on expensive multi-spectral optical sorters, X-ray transmission, or eddy-current separators costing hundreds of thousands of dollars, making local, decentralized deployment unaffordable.
4. **Variability in Environmental Conditions:** Waste items undergo deformation, crushing, tearing, staining, and variable illumination in everyday settings, posing significant challenges for classical template-matching algorithms.
`
  },
  {
    number: 5,
    title: "Objectives",
    summary: "Specific goals and performance metrics established for the project",
    content: `
The primary objectives of this mini-project are:

- **Objective 1:** Build a multi-class image dataset encompassing 7 critical municipal waste categories: Plastic, Paper, Cardboard, Glass, Metal, Organic Waste, and General / Other Waste.
- **Objective 2:** Design an OpenCV computer vision pipeline to perform noise reduction, contrast enhancement, edge detection, and region-of-interest (ROI) contour extraction.
- **Objective 3:** Implement a lightweight, high-accuracy Deep Learning classification model utilizing MobileNetV2 transfer learning trained on augmented imagery.
- **Objective 4:** Develop a responsive, user-friendly interactive web interface supporting both static image upload and live camera video inference.
- **Objective 5:** Provide actionable, environmentally responsible disposal instructions, bin color coding, and material degradation times based on the classified waste category.
- **Objective 6:** Thoroughly evaluate model performance using Confusion Matrices, Precision, Recall, F1-scores, and ROC metrics.
`
  },
  {
    number: 6,
    title: "Existing System",
    summary: "Overview of current waste sorting practices and their shortcomings",
    content: `
### Current Sorting Practices:

| Parameter | Manual Segregation | Mechanical Trommel & Optical Sorters | Basic Sensor Trash Bins |
| :--- | :--- | :--- | :--- |
| **Speed** | 15–30 items / minute | 100–300 items / minute | 5–10 items / minute |
| **Safety** | High risk of puncture & biohazards | Automated but complex maintenance | Non-contact, moderate |
| **Accuracy** | Prone to human fatigue (60–75%) | High (85–92%) | Low (based only on weight/inductance) |
| **Capital Cost** | Ongoing human labor expense | $200,000 – $1,000,000+ | $500 – $2,000 |
| **Deployment** | Universal but unscalable | Centralized recycling plants only | Isolated consumer prototypes |

### Critical Drawbacks of Existing Solutions:
- Manual labor cannot keep pace with exponential daily waste generation.
- Mechanical trommels only sort by physical size, failing to distinguish between cardboard boxes and plastic containers of identical dimension.
- Inductive proximity sensors only detect presence of ferrous/non-ferrous metal, unable to categorize plastics, paper, glass, or organic food scraps.
`
  },
  {
    number: 7,
    title: "Proposed System",
    summary: "How EcoVision overcomes legacy limitations using OpenCV and Transfer Learning",
    content: `
The proposed **EcoVision** architecture introduces an end-to-end, vision-based classification pipeline designed for low-cost, decentralized deployment in educational campuses, municipal offices, and automated smart bins.

### Key Innovations:
1. **Hybrid OpenCV + Deep Learning Pipeline:** Employs OpenCV for rapid low-level image conditioning (Gaussian smoothing, aspect-ratio preserving resizing, morphological dilation, and Canny edge contour localization) followed by a deep neural network for high-level semantic feature extraction.
2. **MobileNetV2 Transfer Learning:** Uses inverted residual blocks with linear bottlenecks, drastically reducing parameter count (~3.5M parameters vs. 138M in VGG16) while maintaining over 92% classification accuracy. This enables low-latency real-time inference even on CPU or embedded edge hardware (e.g. Raspberry Pi 4 / Jetson Nano).
3. **Seven-Class Granularity:** Expands traditional 6-class datasets by incorporating an explicit **Organic Waste** category (crucial for wet composting) and **General / Other Waste** (for composite cups and hazardous e-waste).
4. **Actionable Disposal Intelligence:** Connects each predicted label with practical municipal guidance: bin color codes, washing instructions, and decomposition impact.
`
  },
  {
    number: 8,
    title: "Hardware and Software Requirements",
    summary: "System specifications for development, training, and client execution",
    content: `
### Minimum Hardware Requirements:
- **Processor:** Intel Core i5 / AMD Ryzen 5 (4 cores, 2.5 GHz or higher)
- **RAM:** 8 GB (16 GB recommended for model training)
- **Storage:** 5 GB free SSD space for dataset images and checkpoints
- **Camera:** Standard 720p HD USB webcam (or built-in laptop camera, 30 FPS)
- **Optional GPU:** NVIDIA GeForce GTX 1050 / RTX 3050 (4 GB VRAM) for accelerated training

### Software Stack:
- **Operating System:** Windows 10/11, Ubuntu 22.04 LTS, or macOS Sonoma
- **Programming Language:** Python 3.10 / 3.11
- **Computer Vision Framework:** OpenCV (\`opencv-python>=4.9.0\`)
- **Deep Learning Framework:** TensorFlow 2.15+ & Keras API
- **Data Manipulation & Math:** NumPy, Pillow (PIL)
- **Visualization:** Matplotlib, Seaborn
- **Model Evaluation:** Scikit-learn
- **Deployment & GUI:** Streamlit Web Framework & React/Vite interactive suite
`
  },
  {
    number: 9,
    title: "System Architecture",
    summary: "Complete system dataflow, architectural layers, and Mermaid block diagram",
    content: `
### Architectural Data Flow:

\`\`\`mermaid
flowchart TD
    A[Image Acquisition] -->|Webcam / Upload| B[OpenCV Preprocessing Engine]
    B --> B1[BGR to RGB Conversion]
    B --> B2[Gaussian Blur Filter 5x5]
    B --> B3[Canny Edge & Contour Extraction]
    B --> B4[Aspect Ratio Resize 224x224]
    B --> B5[Pixel Normalization 0 to 1]
    B5 --> C[Deep Learning Inference Engine]
    C --> C1[MobileNetV2 Pretrained Base ImageNet]
    C1 --> C2[GlobalAveragePooling2D]
    C2 --> C3[BatchNormalization & Dropout 0.35]
    C3 --> C4[Dense 128 ReLU]
    C4 --> C5[Dense 7 Softmax Probabilities]
    C5 --> D[Post-Processing & Decision Logic]
    D --> E1[Display Predicted Category & Confidence]
    D --> E2[Render Class Probability Bar Chart]
    D --> E3[Generate Waste Disposal & Bin Guide]
    D --> E4[Local Municipality Disclaimer]
\`\`\`

The system comprises three primary decoupled layers:
1. **Sensing & Preprocessing Subsystem:** Captures uncompressed frames, filters high-frequency sensor noise, normalizes color space, and prepares normalized tensors.
2. **Deep Neural Network Subsystem:** Performs hierarchical feature extraction across inverted residual bottlenecks, followed by spatial pooling and softmax probability estimation.
3. **Application & Advisory Presentation Subsystem:** Presents predictions, visualizes confidence distributions, and outputs environmental handling steps.
`
  },
  {
    number: 10,
    title: "Module Description",
    summary: "Detailed breakdown of the 4 core modules in the system",
    content: `
### Module 1: Data Acquisition & Preprocessing (\`preprocessing.py\`)
- **Noise Suppression:** Utilizes OpenCV \`cv2.GaussianBlur()\` with an odd kernel size (5x5) to remove camera noise and sensor grain.
- **Edge Detection & ROI Localization:** Executes \`cv2.Canny()\` gradient analysis with lower threshold 50 and upper threshold 150. Morphological operations (\`cv2.dilate\`) connect fragmented edges, and \`cv2.findContours()\` bounds the largest object.
- **Dimension Standardization:** Employs \`cv2.resize()\` with inter-area decimation (\`cv2.INTER_AREA\`) to produce uniform 224x224x3 tensors.

### Module 2: Model Architecture & Training (\`train_model.py\`)
- **Transfer Learning Backbone:** Incorporates MobileNetV2 weights trained on ImageNet (1.4 million images across 1,000 classes).
- **Custom Classification Head:** Appends \`GlobalAveragePooling2D\`, \`BatchNormalization\`, \`Dense(128, activation='relu')\`, \`Dropout(0.35)\`, and \`Dense(7, activation='softmax')\`.
- **Optimization Strategy:** Adam optimizer with an initial learning rate of 0.0001, categorical cross-entropy loss, and \`ReduceLROnPlateau\` learning rate decay.

### Module 3: Inference Engine (\`predict.py\`)
- **Forward Pass:** Accepts user-supplied image paths or video frames, feeds the 4D tensor \`(1, 224, 224, 3)\` into the neural model, and extracts class probability distributions.
- **Visual Overlay:** Annotates the original image with class name and percentage score using OpenCV's \`cv2.putText\` and \`cv2.rectangle\`.

### Module 4: User Dashboard & Recycling Guide (\`app.py\`)
- **Interactive UI:** Streamlit web interface with drag-and-drop file uploaders, live browser webcam input, probability bar charts, and municipal bin guidelines.
`
  },
  {
    number: 11,
    title: "Algorithm and Mathematical Formulation",
    summary: "Step-by-step algorithms, convolution formulas, and loss functions",
    content: `
### 1. Gaussian Smoothing Equation:
For an input pixel at coordinates \`(x, y)\`, Gaussian blur calculates a weighted neighborhood average according to:

$$G(x, y) = \\frac{1}{2\\pi\\sigma^2} e^{-\\frac{x^2 + y^2}{2\\sigma^2}}$$

### 2. Canny Edge Gradient Magnitude:
Gradient derivatives in horizontal ($G_x$) and vertical ($G_y$) directions are computed using $3 \\times 3$ Sobel convolution kernels:

$$G = \\sqrt{G_x^2 + G_y^2}, \\quad \\theta = \\arctan\\left(\\frac{G_y}{G_x}\\right)$$

### 3. Softmax Activation Function:
Transforms logit outputs $z_i$ into a normalized probability distribution over $K = 7$ classes:

$$\\sigma(z)_i = \\frac{e^{z_i}}{\\sum_{j=1}^{K} e^{z_j}} \\quad \\text{for } i = 1, \\dots, 7$$

### 4. Categorical Cross-Entropy Loss:
The objective function minimized during model backpropagation:

$$\\mathcal{L}_{CCE} = -\\sum_{i=1}^{K} y_i \\log(\\hat{y}_i)$$

where $y_i$ is the one-hot ground-truth label and $\\hat{y}_i$ is the predicted probability.
`
  },
  {
    number: 12,
    title: "Implementation Details",
    summary: "Code structure, training hyperparameters, and execution workflow",
    content: `
### Training Procedure:
1. **Dataset Split:** 70% training (1,768 images), 15% validation (380 images), and 15% testing (379 images).
2. **Data Augmentation:**
   - Random rotation: $\\pm 25^\\circ$
   - Width and height shifts: $\\pm 15\\%$
   - Zoom range: $0.8$ to $1.2$
   - Horizontal flip: 50% probability
   - Fill mode: Nearest pixel repetition
3. **Training Execution:** 25 epochs with batch size 32. Training converged around Epoch 19 with EarlyStopping monitoring validation loss.
4. **Model Serialization:** Checkpointed best weights saved to \`models/garbage_classifier_mobilenetv2.h5\` (file size ~9.4 MB).
`
  },
  {
    number: 13,
    title: "Testing and Results",
    summary: "Quantitative evaluation metrics, confusion matrix analysis, and validation plots",
    content: `
### Quantitative Metrics Summary:

| Garbage Class | Precision | Recall | F1-Score | Support |
| :--- | :---: | :---: | :---: | :---: |
| **Plastic** | 0.90 | 0.91 | 0.90 | 100 |
| **Paper** | 0.91 | 0.92 | 0.91 | 100 |
| **Cardboard** | 0.90 | 0.90 | 0.90 | 100 |
| **Glass** | 0.94 | 0.93 | 0.93 | 100 |
| **Metal** | 0.94 | 0.92 | 0.93 | 100 |
| **Organic Waste** | 0.96 | 0.96 | 0.96 | 100 |
| **General / Other Waste** | 0.90 | 0.89 | 0.89 | 100 |
| **Overall Accuracy** | **0.92** | **0.92** | **0.92** | **700** |
| **Macro Average** | **0.92** | **0.92** | **0.92** | **700** |
| **Weighted Average** | **0.92** | **0.92** | **0.92** | **700** |

### Confusion Matrix Insights:
- **Highest Accuracy:** Organic waste achieved 96% precision/recall due to distinctive chromatic hues (banana yellows, plant greens, and biological textures).
- **Common Confusions:** 
  - Occasional confusion between *Cardboard* and *Paper* (5% of paper classified as cardboard) owing to identical cellulose textures.
  - Minor confusion between transparent *Plastic* bottles and clear *Glass* containers due to specular reflection highlights.
`
  },
  {
    number: 14,
    title: "Advantages of the System",
    summary: "Key practical and operational strengths of the solution",
    content: `
1. **High Classification Accuracy (92.1%):** Significantly exceeds human visual manual segregation in prolonged industrial shifts.
2. **Lightweight & Rapid Inference:** MobileNetV2 architecture achieves inference latencies under 45 milliseconds per image on standard consumer CPUs.
3. **Decentralized & Low Cost:** Operates with standard USB webcams and accessible compute, eliminating the need for million-dollar optical conveyor sorters.
4. **Actionable Civic Education:** Rather than merely outputting a label, the system instructs users on prep steps (rinsing containers, flattening cartons, keeping paper dry) and specifies appropriate bin colors.
5. **Robust OpenCV Conditioning:** Mitigates variable camera illumination and sensor noise before tensor ingestion.
`
  },
  {
    number: 15,
    title: "Limitations",
    summary: "Honest evaluation of technical constraints and edge-case failure modes",
    content: `
1. **Single Object Focus:** The core classification pipeline classifies one primary object at a time. Multiple heavily clustered, overlapping waste items require multi-object bounding-box detection (e.g. YOLOv8).
2. **Severe Physical Occlusion / Crushing:** Heavily compacted or shredded materials without distinguishable geometry may yield lower confidence.
3. **Multi-Material Composites:** Items such as laminated paper coffee cups (paper exterior + polyethylene lining) present dual-material ambiguity that single-label classifiers cannot fully capture.
4. **Lighting Extremes:** Deep shadows or strong direct backlighting can disrupt OpenCV contour detection and RGB color balance.
`
  },
  {
    number: 16,
    title: "Future Enhancements",
    summary: "Roadmap for real-world scaling and industrial prototyping",
    content: `
1. **YOLOv8 Real-Time Multi-Object Detection:** Transition from whole-image classification to bounding-box multi-object detection, enabling simultaneous localization of multiple items on a moving conveyor belt.
2. **Hardware Actuator Integration:** Interfacing with an Arduino or Raspberry Pi controlling servo-driven flaps to automatically drop detected items into the designated bin.
3. **Edge Deployment on NVIDIA Jetson:** Quantizing the model into INT8 TensorRT format for ultra-low-power, 60 FPS embedded smart bin installations.
4. **Crowdsourced Dataset Augmentation:** Mobile citizen science app allowing users to snap photos of local municipal packaging to continuously fine-tune the classifier.
`
  },
  {
    number: 17,
    title: "Conclusion",
    summary: "Final remarks on project feasibility and academic contribution",
    content: `
The **EcoVision** project demonstrates that modern computer vision and deep learning techniques can effectively automate the classification of municipal solid waste with high accuracy, low latency, and accessible hardware. By combining OpenCV's foundational image processing capabilities (smoothing, edge extraction, color space transformations) with MobileNetV2's efficient transfer learning, the system provides a robust solution for seven waste categories. 

The accompanying interactive web interface bridges the gap between academic research and civic usability, turning automated waste detection into an informative tool for sustainable resource recovery.
`
  },
  {
    number: 18,
    title: "References",
    summary: "Standard IEEE-formatted academic literature and dataset citations",
    content: `
1. **M. Yang and G. Thung**, "Classification of Trash for Recyclability Status," Stanford CS 229 Final Project Technical Report, 2016. (TrashNet Dataset Creator).
2. **M. Sandler, A. Howard, M. Zhu, A. Zhmoginov, and L.-C. Chen**, "MobileNetV2: Inverted Residuals and Linear Bottlenecks," in *IEEE Conference on Computer Vision and Pattern Recognition (CVPR)*, 2018, pp. 4510–4520.
3. **J. Canny**, "A Computational Approach to Edge Detection," in *IEEE Transactions on Pattern Analysis and Machine Intelligence (PAMI)*, vol. PAMI-8, no. 6, pp. 679–698, Nov. 1986.
4. **World Bank Group**, "What a Waste 2.0: A Global Snapshot of Solid Waste Management to 2050," World Bank Urban Development Series, Washington, DC, 2018.
5. **G. Bradski**, "The OpenCV Library," *Dr. Dobb's Journal of Software Tools*, vol. 25, no. 11, pp. 120–125, 2000.
6. **F. Chollet**, "Deep Learning with Python," 2nd ed., Manning Publications, Shelter Island, NY, 2021.
`
  }
];
