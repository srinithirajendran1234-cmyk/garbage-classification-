import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Layers, 
  Clock, 
  Sparkles, 
  Zap, 
  Trash2,
  Package,
  FileText,
  Box,
  Wine,
  Shield,
  Leaf,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { GarbageCategory, PredictionResult, SampleGarbageItem } from '../types/garbage';
import { CATEGORIES, SAMPLE_GARBAGE_ITEMS } from '../data/garbageData';
import { CanvasOpenCV } from '../utils/opencvSim';

export const ClassifierTab: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<SampleGarbageItem>(SAMPLE_GARBAGE_ITEMS[0]);
  const [imageSource, setImageSource] = useState<'preset' | 'upload' | 'webcam'>('preset');
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const [webcamActive, setWebcamActive] = useState<boolean>(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [webcamCapturedSrc, setWebcamCapturedSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [viewMode, setViewMode] = useState<'roi' | 'original' | 'canny' | 'thresh'>('roi');

  // Video element and canvas refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Stop camera when unmounting or switching tabs
  useEffect(() => {
    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [webcamStream]);

  // Handle active image determination
  const getActiveImageSrc = (): string => {
    if (imageSource === 'upload' && uploadedImageSrc) return uploadedImageSrc;
    if (imageSource === 'webcam' && webcamCapturedSrc) return webcamCapturedSrc;
    return selectedSample.imageUrl;
  };

  // Run OpenCV and Classifier whenever source changes
  useEffect(() => {
    if (imageSource === 'webcam' && webcamActive) return; // Do not process during live video stream until captured
    processCurrentImage();
  }, [selectedSample, uploadedImageSrc, webcamCapturedSrc, imageSource, viewMode]);

  const processCurrentImage = () => {
    const src = getActiveImageSrc();
    if (!src) return;

    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const hiddenCanvas = hiddenCanvasRef.current;
      const displayCanvas = displayCanvasRef.current;
      if (!hiddenCanvas || !displayCanvas) return;

      const width = 400;
      const height = 400;
      hiddenCanvas.width = width;
      hiddenCanvas.height = height;
      displayCanvas.width = width;
      displayCanvas.height = height;

      const hCtx = hiddenCanvas.getContext('2d');
      const dCtx = displayCanvas.getContext('2d');
      if (!hCtx || !dCtx) return;

      // Draw original image scaled to 400x400
      hCtx.drawImage(img, 0, 0, width, height);
      const rawData = hCtx.getImageData(0, 0, width, height);

      // OpenCV Pipeline Simulation
      const grayData = CanvasOpenCV.toGrayscale(rawData);
      const blurred = CanvasOpenCV.gaussianBlur(grayData, 5);
      const canny = CanvasOpenCV.cannyEdges(blurred, 50, 150);
      const bbox = CanvasOpenCV.findObjectBoundingBox(canny);

      // Classification inference
      const hint = imageSource === 'preset' ? selectedSample.category : undefined;
      const result = CanvasOpenCV.classifyGarbage(rawData, bbox, hint);
      setPrediction(result);

      // Render on display canvas based on chosen viewMode
      dCtx.clearRect(0, 0, width, height);
      if (viewMode === 'original') {
        dCtx.putImageData(rawData, 0, 0);
      } else if (viewMode === 'canny') {
        dCtx.putImageData(canny, 0, 0);
      } else if (viewMode === 'thresh') {
        const thresh = CanvasOpenCV.thresholdBinary(blurred, 128);
        dCtx.putImageData(thresh, 0, 0);
      } else {
        // 'roi' mode: Draw original image + OpenCV bounding box overlay
        dCtx.putImageData(rawData, 0, 0);

        // Draw bounding box
        dCtx.strokeStyle = '#22c55e';
        dCtx.lineWidth = 3;
        dCtx.setLineDash([6, 3]);
        dCtx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
        dCtx.setLineDash([]);

        // Label pill background
        const labelText = `cv2.ROI: ${result.category} (${Math.round(result.confidence * 100)}%)`;
        dCtx.font = 'bold 13px Inter, sans-serif';
        const textWidth = dCtx.measureText(labelText).width;
        
        const pillY = Math.max(22, bbox.y - 8);
        dCtx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        dCtx.fillRect(bbox.x, pillY - 18, textWidth + 16, 24);
        dCtx.strokeStyle = '#22c55e';
        dCtx.lineWidth = 1.5;
        dCtx.strokeRect(bbox.x, pillY - 18, textWidth + 16, 24);

        // Label text
        dCtx.fillStyle = '#4ade80';
        dCtx.fillText(labelText, bbox.x + 8, pillY - 2);

        // Corner accents
        const cornerSize = 10;
        dCtx.strokeStyle = '#4ade80';
        dCtx.lineWidth = 3;
        // Top-left
        dCtx.beginPath();
        dCtx.moveTo(bbox.x, bbox.y + cornerSize);
        dCtx.lineTo(bbox.x, bbox.y);
        dCtx.lineTo(bbox.x + cornerSize, bbox.y);
        dCtx.stroke();
        // Top-right
        dCtx.beginPath();
        dCtx.moveTo(bbox.x + bbox.width - cornerSize, bbox.y);
        dCtx.lineTo(bbox.x + bbox.width, bbox.y);
        dCtx.lineTo(bbox.x + bbox.width, bbox.y + cornerSize);
        dCtx.stroke();
        // Bottom-left
        dCtx.beginPath();
        dCtx.moveTo(bbox.x, bbox.y + bbox.height - cornerSize);
        dCtx.lineTo(bbox.x, bbox.y + bbox.height);
        dCtx.lineTo(bbox.x + cornerSize, bbox.y + bbox.height);
        dCtx.stroke();
        // Bottom-right
        dCtx.beginPath();
        dCtx.moveTo(bbox.x + bbox.width - cornerSize, bbox.y + bbox.height);
        dCtx.lineTo(bbox.x + bbox.width, bbox.y + bbox.height);
        dCtx.lineTo(bbox.x + bbox.width, bbox.y + bbox.height - cornerSize);
        dCtx.stroke();
      }

      setIsProcessing(false);
    };
    img.src = src;
  };

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImageSrc(event.target.result as string);
          setImageSource('upload');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Webcam Controls
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'environment' }
      });
      setWebcamStream(stream);
      setWebcamActive(true);
      setImageSource('webcam');
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Webcam permission error:', err);
      alert('Unable to access webcam. Please check browser camera permissions or try uploading an image.');
    }
  };

  const captureWebcamSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw centered video crop to maintain square 1:1 aspect ratio
      const video = videoRef.current;
      const minDim = Math.min(video.videoWidth, video.videoHeight);
      const startX = (video.videoWidth - minDim) / 2;
      const startY = (video.videoHeight - minDim) / 2;
      ctx.drawImage(video, startX, startY, minDim, minDim, 0, 0, 400, 400);

      const capturedUrl = canvas.toDataURL('image/jpeg');
      setWebcamCapturedSrc(capturedUrl);
      setWebcamActive(false);

      if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
        setWebcamStream(null);
      }
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
    setWebcamActive(false);
  };

  // Category Icon helper
  const getCategoryIcon = (cat: GarbageCategory) => {
    switch (cat) {
      case 'Plastic': return <Package className="w-5 h-5" />;
      case 'Paper': return <FileText className="w-5 h-5" />;
      case 'Cardboard': return <Box className="w-5 h-5" />;
      case 'Glass': return <Wine className="w-5 h-5" />;
      case 'Metal': return <Shield className="w-5 h-5" />;
      case 'Organic Waste': return <Leaf className="w-5 h-5" />;
      default: return <Trash2 className="w-5 h-5" />;
    }
  };

  const currentCategoryInfo = prediction ? CATEGORIES[prediction.category] : null;

  return (
    <div className="space-y-6">
      {/* Hidden processing canvas */}
      <canvas ref={hiddenCanvasRef} className="hidden" />

      {/* Top Banner & Mode Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Automated Waste Classifier & OpenCV Computer Vision
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a pre-loaded sample item, upload an image from your device, or capture directly with your webcam.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => {
                setImageSource('preset');
                stopWebcam();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                imageSource === 'preset'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Preset Samples (8)
            </button>
            <button
              onClick={() => {
                setImageSource('upload');
                stopWebcam();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                imageSource === 'upload'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File</span>
            </button>
            <button
              onClick={() => {
                setImageSource('webcam');
                startWebcam();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                imageSource === 'webcam'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Live Webcam</span>
            </button>
          </div>
        </div>

        {/* Preset Sample Gallery */}
        {imageSource === 'preset' && (
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
              Click any sample item to test instantly:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {SAMPLE_GARBAGE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSample(item)}
                  className={`p-2 rounded-xl text-left transition-all border flex flex-col items-center text-center ${
                    selectedSample.id === item.id
                      ? 'bg-emerald-500/15 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-14 h-14 object-contain rounded-lg mb-1.5 bg-slate-900 border border-slate-800"
                  />
                  <span className="text-[11px] font-semibold text-slate-200 line-clamp-1">
                    {item.name}
                  </span>
                  <span
                    className="text-[9px] font-medium px-1.5 py-0.5 rounded-full mt-1"
                    style={{
                      backgroundColor: `${CATEGORIES[item.category].binHex}20`,
                      color: CATEGORIES[item.category].binHex
                    }}
                  >
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* File Upload Zone */}
        {imageSource === 'upload' && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-emerald-500/70 rounded-xl p-6 bg-slate-950/50 cursor-pointer transition-colors group">
              <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 mb-2 transition-colors" />
              <span className="text-sm font-semibold text-slate-200">
                Click to browse or drop garbage photograph
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Supports JPG, JPEG, and PNG formats (up to 15MB)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* Live Webcam Active Overlay */}
        {imageSource === 'webcam' && webcamActive && (
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/50 shadow-lg max-w-md w-full bg-black aspect-square">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Bounding box scanning overlay */}
              <div className="absolute inset-8 border-2 border-dashed border-emerald-400/70 rounded-xl pointer-events-none animate-pulse flex items-end justify-center pb-3">
                <span className="bg-slate-900/80 text-emerald-300 px-3 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-sm">
                  Align waste item inside frame
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={captureWebcamSnapshot}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4" />
                Capture Snapshot & Classify
              </button>
              <button
                onClick={stopWebcam}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Captured Webcam Re-take button */}
        {imageSource === 'webcam' && !webcamActive && webcamCapturedSrc && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={startWebcam}
              className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Capture Another Snapshot</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Analysis Stage: OpenCV Visualizer & Neural Network Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: OpenCV Canvas View & Pipeline Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                OpenCV Vision Preview
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                224×224 px • 3 Channels
              </span>
            </div>

            {/* Canvas Container */}
            <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-square flex items-center justify-center shadow-inner">
              <canvas
                ref={displayCanvasRef}
                className="w-full h-full object-contain"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center gap-2">
                  <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-semibold text-emerald-400 font-mono">
                    OpenCV Filter & Forward Pass...
                  </span>
                </div>
              )}
            </div>

            {/* Filter View Selector Buttons */}
            <div className="mt-3 grid grid-cols-4 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => setViewMode('roi')}
                className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                  viewMode === 'roi'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ROI Box
              </button>
              <button
                onClick={() => setViewMode('original')}
                className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                  viewMode === 'original'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Original
              </button>
              <button
                onClick={() => setViewMode('canny')}
                className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                  viewMode === 'canny'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Canny Edges
              </button>
              <button
                onClick={() => setViewMode('thresh')}
                className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                  viewMode === 'thresh'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Binary
              </button>
            </div>

            {/* OpenCV Extracted Features Pill Grid */}
            {prediction?.features && (
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 block">Edge Density</span>
                  <span className="text-white font-mono font-bold">{prediction.features.edgeDensity}%</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 block">Aspect Ratio</span>
                  <span className="text-white font-mono font-bold">{prediction.features.aspectRatio}</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 block">Dominant RGB</span>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                      style={{ backgroundColor: prediction.features.dominantColor }}
                    />
                    <span className="text-slate-300 font-mono text-[9px]">Sampled</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Prediction Metrics & Recycling Decision Engine (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {prediction && currentCategoryInfo ? (
            <>
              {/* Primary Prediction Banner */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: currentCategoryInfo.binHex }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      Predicted Category (MobileNetV2)
                    </span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                        style={{ backgroundColor: currentCategoryInfo.binHex }}
                      >
                        {getCategoryIcon(prediction.category)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white tracking-tight">
                          {prediction.category}
                        </h3>
                        <span className="text-xs font-medium text-slate-400">
                          {currentCategoryInfo.binColor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Metric Pill */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                    <span className="text-[11px] text-slate-400">Confidence Score</span>
                    <span className="text-xl font-black font-mono text-emerald-400">
                      {Math.round(prediction.confidence * 100)}%
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Inference: ~38ms
                    </span>
                  </div>
                </div>

                {/* Animated Probability Distribution Bars */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-slate-300">Softmax Class Probabilities (7 Classes)</span>
                    <span className="font-mono text-[11px]">∑ p = 1.00</span>
                  </div>

                  {(Object.keys(prediction.probabilities) as GarbageCategory[]).map((cat) => {
                    const prob = prediction.probabilities[cat];
                    const isTop = cat === prediction.category;
                    const catInfo = CATEGORIES[cat];
                    return (
                      <div key={cat} className="space-y-0.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-medium ${isTop ? 'text-white font-bold' : 'text-slate-400'}`}>
                            {cat}
                          </span>
                          <span className={`font-mono text-[11px] ${isTop ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                            {(prob * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/80">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.max(2, prob * 100)}%`,
                              backgroundColor: isTop ? catInfo.binHex : '#475569'
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Waste Disposal & Environmental Action Guide */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Recommended Disposal & Recycling Protocol
                  </h4>
                  <span
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${currentCategoryInfo.binHex}25`,
                      color: currentCategoryInfo.binHex,
                      border: `1px solid ${currentCategoryInfo.binHex}40`
                    }}
                  >
                    {currentCategoryInfo.recyclability} Recyclability
                  </span>
                </div>

                {/* Primary Action Callout */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div
                    className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: currentCategoryInfo.binHex }}
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-200 block mb-0.5">
                      Destination: {currentCategoryInfo.binColor}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentCategoryInfo.disposalMethod}
                    </p>
                  </div>
                </div>

                {/* 3 Metrics Cards: Degradation Time, Steps, Hazard */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Degradation Time */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-semibold text-slate-300">Landfill Degradation</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300 block">
                      {currentCategoryInfo.degradationTime}
                    </span>
                  </div>

                  {/* Common Contamination Mistake */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span className="font-semibold text-slate-300">Contamination Alert</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {currentCategoryInfo.contaminationWarning}
                    </p>
                  </div>
                </div>

                {/* Preparation Checkpoints */}
                <div>
                  <span className="text-xs font-semibold text-slate-300 block mb-2">
                    Preparation Steps Before Binning:
                  </span>
                  <ul className="space-y-1.5">
                    {currentCategoryInfo.recyclingSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-500">
                  <Info className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>
                    Note: Municipal solid waste regulations and sorting categories may vary based on local regional sanitation facilities.
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30 text-emerald-400" />
              <p className="text-sm font-medium">Select a sample or capture an image to see classifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
