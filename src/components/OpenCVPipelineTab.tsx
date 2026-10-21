import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  Sliders, 
  Code, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  ArrowRight,
  Maximize2,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { SAMPLE_GARBAGE_ITEMS } from '../data/garbageData';
import { CanvasOpenCV } from '../utils/opencvSim';

export const OpenCVPipelineTab: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_GARBAGE_ITEMS[0]);
  const [kernelSize, setKernelSize] = useState<number>(5);
  const [cannyT1, setCannyT1] = useState<number>(50);
  const [cannyT2, setCannyT2] = useState<number>(150);
  const [threshVal, setThreshVal] = useState<number>(128);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Canvas refs for the 6 stages
  const canvasOriginalRef = useRef<HTMLCanvasElement | null>(null);
  const canvasGrayRef = useRef<HTMLCanvasElement | null>(null);
  const canvasBlurRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCannyRef = useRef<HTMLCanvasElement | null>(null);
  const canvasThreshRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContoursRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    runAllPipelineStages();
  }, [selectedSample, kernelSize, cannyT1, cannyT2, threshVal]);

  const runAllPipelineStages = () => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const size = 260;
      const canvases = [
        canvasOriginalRef.current,
        canvasGrayRef.current,
        canvasBlurRef.current,
        canvasCannyRef.current,
        canvasThreshRef.current,
        canvasContoursRef.current
      ];

      canvases.forEach(c => {
        if (c) {
          c.width = size;
          c.height = size;
        }
      });

      // 1. Original
      const cOrig = canvasOriginalRef.current;
      if (!cOrig) return;
      const ctxOrig = cOrig.getContext('2d');
      if (!ctxOrig) return;
      ctxOrig.drawImage(img, 0, 0, size, size);
      const rawData = ctxOrig.getImageData(0, 0, size, size);

      // 2. Grayscale
      const grayData = CanvasOpenCV.toGrayscale(rawData);
      const cGray = canvasGrayRef.current;
      if (cGray) cGray.getContext('2d')?.putImageData(grayData, 0, 0);

      // 3. Gaussian Blur
      const blurData = CanvasOpenCV.gaussianBlur(grayData, kernelSize);
      const cBlur = canvasBlurRef.current;
      if (cBlur) cBlur.getContext('2d')?.putImageData(blurData, 0, 0);

      // 4. Canny Edges
      const cannyData = CanvasOpenCV.cannyEdges(blurData, cannyT1, cannyT2);
      const cCanny = canvasCannyRef.current;
      if (cCanny) cCanny.getContext('2d')?.putImageData(cannyData, 0, 0);

      // 5. Binary Threshold
      const threshData = CanvasOpenCV.thresholdBinary(blurData, threshVal);
      const cThresh = canvasThreshRef.current;
      if (cThresh) cThresh.getContext('2d')?.putImageData(threshData, 0, 0);

      // 6. Contours & Bounding Box
      const bbox = CanvasOpenCV.findObjectBoundingBox(cannyData);
      const cContour = canvasContoursRef.current;
      if (cContour) {
        const ctxContour = cContour.getContext('2d');
        if (ctxContour) {
          ctxContour.putImageData(rawData, 0, 0);
          ctxContour.strokeStyle = '#22c55e';
          ctxContour.lineWidth = 2.5;
          ctxContour.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);

          ctxContour.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctxContour.fillRect(bbox.x, Math.max(0, bbox.y - 20), 110, 18);
          ctxContour.fillStyle = '#4ade80';
          ctxContour.font = 'bold 10px Inter, sans-serif';
          ctxContour.fillText(`cv2.ROI: ${bbox.width}x${bbox.height}`, bbox.x + 4, Math.max(12, bbox.y - 7));
        }
      }
    };
    img.src = selectedSample.imageUrl;
  };

  const handleCopy = (codeText: string, id: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const stages = [
    {
      id: 's1',
      title: '1. Original Image Loading & BGR conversion',
      canvasRef: canvasOriginalRef,
      cvFunction: 'cv2.imread() & cv2.cvtColor(img, cv2.COLOR_BGR2RGB)',
      description: 'OpenCV imports color digital images in BGR pixel ordering. We convert to standard RGB format to ensure true colors before computer vision operations.',
      pythonSnippet: `import cv2\n\n# Load image with OpenCV\nimg_bgr = cv2.imread("waste_sample.jpg")\n# Convert BGR to RGB\nimg_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)`
    },
    {
      id: 's2',
      title: '2. Grayscale Conversion',
      canvasRef: canvasGrayRef,
      cvFunction: 'cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)',
      description: 'Collapses 3 color channels into single luminance intensity channel Y = 0.299R + 0.587G + 0.114B, reducing computational complexity by 66%.',
      pythonSnippet: `# Convert RGB to single-channel Grayscale\ngray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)\nprint("Grayscale shape:", gray.shape) # (H, W)`
    },
    {
      id: 's3',
      title: `3. Gaussian Blur Smoothing (${kernelSize}x${kernelSize} kernel)`,
      canvasRef: canvasBlurRef,
      cvFunction: `cv2.GaussianBlur(gray, (${kernelSize}, ${kernelSize}), 0)`,
      description: 'Applies 2D Gaussian convolution to attenuate high-frequency image noise, sensor grain, and minor surface texture blemishes before edge detection.',
      pythonSnippet: `# Convolve with Gaussian kernel to remove camera noise\nblurred = cv2.GaussianBlur(gray, (${kernelSize}, ${kernelSize}), 0)`
    },
    {
      id: 's4',
      title: `4. Canny Edge Detection (${cannyT1}, ${cannyT2})`,
      canvasRef: canvasCannyRef,
      cvFunction: `cv2.Canny(blurred, ${cannyT1}, ${cannyT2})`,
      description: 'Calculates directional Sobel gradients (Gx, Gy), computes gradient magnitude, performs non-maximum suppression, and traces continuous strong edges via hysteresis.',
      pythonSnippet: `# Canny edge detection with lower & upper hysteresis thresholds\nedges = cv2.Canny(blurred, ${cannyT1}, ${cannyT2})`
    },
    {
      id: 's5',
      title: `5. Binary Thresholding (Cutoff: ${threshVal})`,
      canvasRef: canvasThreshRef,
      cvFunction: `cv2.threshold(blurred, ${threshVal}, 255, cv2.THRESH_BINARY)`,
      description: 'Separates foreground waste item from the background surface by converting every pixel above cutoff value to pure white (255) and rest to black (0).',
      pythonSnippet: `# Binary segmentation of foreground object\n_, thresh = cv2.threshold(blurred, ${threshVal}, 255, cv2.THRESH_BINARY)`
    },
    {
      id: 's6',
      title: '6. Contour Localization & Bounding Box ROI',
      canvasRef: canvasContoursRef,
      cvFunction: 'cv2.findContours() & cv2.boundingRect()',
      description: 'Traces connected boundary edge pixels, filters the largest continuous closed contour area, and computes the tightest bounding rectangle coordinates (x, y, w, h).',
      pythonSnippet: `# Find contours and bounding rectangle\ncontours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)\nif contours:\n    largest = max(contours, key=cv2.contourArea)\n    x, y, w, h = cv2.boundingRect(largest)\n    cv2.rectangle(img_rgb, (x, y), (x + w, y + h), (0, 255, 0), 2)`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-400" />
              OpenCV Computer Vision Interactive Pipeline Lab
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Interact with real OpenCV algorithms in real time. Adjust Gaussian kernel, Canny thresholds, and observe changes across all 6 processing stages.
            </p>
          </div>

          {/* Sample Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Test Sample:</span>
            <select
              value={selectedSample.id}
              onChange={(e) => {
                const found = SAMPLE_GARBAGE_ITEMS.find(i => i.id === e.target.value);
                if (found) setSelectedSample(found);
              }}
              className="bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              {SAMPLE_GARBAGE_ITEMS.map(item => (
                <option key={item.id} value={item.id}>
                  {item.category}: {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Real-time OpenCV Parameter Controls */}
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Gaussian Kernel Size */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Gaussian Blur Kernel</span>
              <span className="text-emerald-400 font-mono font-bold">{kernelSize}×{kernelSize}</span>
            </div>
            <input
              type="range"
              min="3"
              max="9"
              step="2"
              value={kernelSize}
              onChange={(e) => setKernelSize(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <span className="text-[10px] text-slate-500 block">Higher = smoother, less noise</span>
          </div>

          {/* Canny Threshold 1 (Low) */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Canny Threshold 1 (Low)</span>
              <span className="text-emerald-400 font-mono font-bold">{cannyT1}</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={cannyT1}
              onChange={(e) => setCannyT1(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <span className="text-[10px] text-slate-500 block">Hysteresis lower bound gradient</span>
          </div>

          {/* Canny Threshold 2 (High) */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Canny Threshold 2 (High)</span>
              <span className="text-emerald-400 font-mono font-bold">{cannyT2}</span>
            </div>
            <input
              type="range"
              min="100"
              max="250"
              step="5"
              value={cannyT2}
              onChange={(e) => setCannyT2(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <span className="text-[10px] text-slate-500 block">Hysteresis upper bound gradient</span>
          </div>

          {/* Binary Threshold Cutoff */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Binary Threshold</span>
              <span className="text-emerald-400 font-mono font-bold">{threshVal}</span>
            </div>
            <input
              type="range"
              min="40"
              max="220"
              step="4"
              value={threshVal}
              onChange={(e) => setThreshVal(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <span className="text-[10px] text-slate-500 block">Foreground separation cutoff</span>
          </div>
        </div>
      </div>

      {/* 6 Pipeline Stage Visualizer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {stage.title}
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  OpenCV 4.9
                </span>
              </div>

              {/* Canvas viewport */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-square flex items-center justify-center my-3 shadow-inner">
                <canvas
                  ref={stage.canvasRef}
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed min-h-[38px]">
                {stage.description}
              </p>
            </div>

            {/* Python OpenCV Function & Code Snippet Box */}
            <div className="mt-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                <span className="truncate max-w-[200px] text-emerald-300 font-semibold">{stage.cvFunction}</span>
                <button
                  onClick={() => handleCopy(stage.pythonSnippet, stage.id)}
                  className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded transition-colors flex items-center gap-1"
                  title="Copy Python code"
                >
                  {copiedCode === stage.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-slate-950 text-slate-300 text-[10px] font-mono p-2.5 rounded-lg border border-slate-800/80 overflow-x-auto">
                <code>{stage.pythonSnippet}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
