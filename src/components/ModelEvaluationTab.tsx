import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Table, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { TRAINING_HISTORY, CONFUSION_MATRIX, CLASSIFICATION_REPORT } from '../data/garbageData';
import { GarbageCategory } from '../types/garbage';

export const ModelEvaluationTab: React.FC = () => {
  const [selectedEpoch, setSelectedEpoch] = useState<number>(25);
  const [hoveredMatrixCell, setHoveredMatrixCell] = useState<{ actual: GarbageCategory; pred: GarbageCategory; count: number } | null>(null);

  const currentMetric = TRAINING_HISTORY.find(h => h.epoch === selectedEpoch) || TRAINING_HISTORY[TRAINING_HISTORY.length - 1];

  // Helper for matrix color intensity
  const getMatrixCellBg = (count: number, isDiagonal: boolean) => {
    if (isDiagonal) {
      // 89 - 96
      const intensity = Math.min(100, Math.round((count / 100) * 100));
      return `rgba(16, 185, 129, ${0.4 + (intensity / 100) * 0.5})`; // Emerald gradient
    }
    if (count === 0) return 'rgba(15, 23, 42, 0.4)';
    // Small misclassification (1 to 6)
    return `rgba(239, 68, 68, ${0.15 + (count / 10) * 0.4})`; // Amber/Red gradient
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Deep Learning Model Training & Evaluation Benchmark
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Quantitative evaluation results on 700 independent test images using MobileNetV2 Transfer Learning.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-1.5 text-right">
              <span className="text-[10px] text-slate-400 block">Overall Test Accuracy</span>
              <span className="text-base font-bold font-mono text-emerald-400">92.1%</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-1.5 text-right">
              <span className="text-[10px] text-slate-400 block">Macro F1-Score</span>
              <span className="text-base font-bold font-mono text-teal-400">0.92</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accuracy & Loss Curves Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accuracy Curve Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Training & Validation Accuracy (25 Epochs)
              </h3>
              <span className="text-xs text-slate-400">Target metric: Categorical accuracy</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                Train Acc: {(currentMetric.trainAcc * 100).toFixed(1)}%
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Val Acc: {(currentMetric.valAcc * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* SVG Line Graph */}
          <div className="h-56 w-full bg-slate-950 rounded-xl border border-slate-800 p-3 relative flex items-end">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              {/* Horizontal Grid lines */}
              {[0, 25, 50, 75, 100].map((val) => {
                const y = 190 - (val / 100) * 170;
                return (
                  <g key={val}>
                    <line x1="30" y1={y} x2="490" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                    <text x="12" y={y + 4} fill="#64748b" fontSize="10" fontFamily="monospace">
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Training Acc Line (Blue) */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={TRAINING_HISTORY.map((h, i) => {
                  const x = 35 + (i / 24) * 445;
                  const y = 190 - h.trainAcc * 170;
                  return `${x},${y}`;
                }).join(' ')}
              />

              {/* Validation Acc Line (Emerald) */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={TRAINING_HISTORY.map((h, i) => {
                  const x = 35 + (i / 24) * 445;
                  const y = 190 - h.valAcc * 170;
                  return `${x},${y}`;
                }).join(' ')}
              />

              {/* Interactive marker on selected epoch */}
              {(() => {
                const idx = selectedEpoch - 1;
                const h = TRAINING_HISTORY[idx];
                const x = 35 + (idx / 24) * 445;
                const yVal = 190 - h.valAcc * 170;
                return (
                  <g>
                    <line x1={x} y1="20" x2={x} y2="190" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
                    <circle cx={x} cy={yVal} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Epoch Slider */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs text-slate-400 font-medium">Scrub Epoch:</span>
            <input
              type="range"
              min="1"
              max="25"
              value={selectedEpoch}
              onChange={(e) => setSelectedEpoch(Number(e.target.value))}
              className="flex-1 accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Epoch {selectedEpoch} / 25
            </span>
          </div>
        </div>

        {/* Loss Curve Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-rose-400" />
                Categorical Cross-Entropy Loss Curves
              </h3>
              <span className="text-xs text-slate-400">Objective: Minimize loss function</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                Train: {currentMetric.trainLoss.toFixed(2)}
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Val: {currentMetric.valLoss.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Loss SVG Graph */}
          <div className="h-56 w-full bg-slate-950 rounded-xl border border-slate-800 p-3 relative flex items-end">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              {/* Grid lines */}
              {[0, 0.5, 1.0, 1.5, 2.0].map((val) => {
                const y = 190 - (val / 2.0) * 170;
                return (
                  <g key={val}>
                    <line x1="30" y1={y} x2="490" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                    <text x="12" y={y + 4} fill="#64748b" fontSize="10" fontFamily="monospace">
                      {val.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Train Loss Line (Rose) */}
              <polyline
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={TRAINING_HISTORY.map((h, i) => {
                  const x = 35 + (i / 24) * 445;
                  const y = 190 - (h.trainLoss / 2.0) * 170;
                  return `${x},${y}`;
                }).join(' ')}
              />

              {/* Validation Loss Line (Amber) */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={TRAINING_HISTORY.map((h, i) => {
                  const x = 35 + (i / 24) * 445;
                  const y = 190 - (h.valLoss / 2.0) * 170;
                  return `${x},${y}`;
                }).join(' ')}
              />

              {/* Selected epoch line marker */}
              {(() => {
                const idx = selectedEpoch - 1;
                const h = TRAINING_HISTORY[idx];
                const x = 35 + (idx / 24) * 445;
                const yLoss = 190 - (h.valLoss / 2.0) * 170;
                return (
                  <g>
                    <line x1={x} y1="20" x2={x} y2="190" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
                    <circle cx={x} cy={yLoss} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                  </g>
                );
              })()}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>EarlyStopping Patience: <strong>6 Epochs</strong></span>
            <span>Learning Rate Decay: <strong>ReduceLROnPlateau</strong></span>
          </div>
        </div>
      </div>

      {/* 7x7 Interactive Confusion Matrix Heatmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Table className="w-4 h-4 text-emerald-400" />
              7×7 Multi-Class Confusion Matrix (700 Test Samples)
            </h3>
            <span className="text-xs text-slate-400">
              Rows represent Ground-Truth Actual classes; Columns represent Model Predicted classes.
            </span>
          </div>

          {hoveredMatrixCell && (
            <div className="bg-slate-950 border border-slate-700 px-3 py-1 rounded-lg text-xs font-mono text-emerald-300">
              Actual: <strong>{hoveredMatrixCell.actual}</strong> → Predicted: <strong>{hoveredMatrixCell.pred}</strong> ({hoveredMatrixCell.count} samples)
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[650px]">
            {/* Top Header Labels (Predicted) */}
            <div className="grid grid-cols-8 gap-1.5 text-center text-xs font-semibold text-slate-300 mb-1">
              <div className="text-slate-500 text-[10px] uppercase font-bold self-end pb-1">
                Actual ↓ / Pred →
              </div>
              {CONFUSION_MATRIX.categories.map((cat) => (
                <div key={cat} className="p-1 rounded bg-slate-950 text-[10px] truncate text-slate-300" title={cat}>
                  {cat}
                </div>
              ))}
            </div>

            {/* Matrix Rows */}
            {CONFUSION_MATRIX.matrix.map((row, rowIdx) => {
              const actualCat = CONFUSION_MATRIX.categories[rowIdx];
              return (
                <div key={actualCat} className="grid grid-cols-8 gap-1.5 text-center mb-1.5 items-center">
                  <div className="text-right text-xs font-semibold text-slate-300 pr-2 truncate text-[11px]" title={actualCat}>
                    {actualCat}
                  </div>
                  {row.map((count, colIdx) => {
                    const predCat = CONFUSION_MATRIX.categories[colIdx];
                    const isDiagonal = rowIdx === colIdx;
                    return (
                      <div
                        key={colIdx}
                        onMouseEnter={() => setHoveredMatrixCell({ actual: actualCat, pred: predCat, count })}
                        onMouseLeave={() => setHoveredMatrixCell(null)}
                        className="py-2.5 rounded-lg font-mono text-xs font-bold transition-transform hover:scale-105 cursor-pointer flex items-center justify-center border border-slate-800"
                        style={{
                          backgroundColor: getMatrixCellBg(count, isDiagonal),
                          color: isDiagonal ? '#ffffff' : count > 0 ? '#fca5a5' : '#475569'
                        }}
                      >
                        {count}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              Correct True Positives (Diagonal)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-500/40" />
              Minor Misclassifications (Off-diagonal)
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Total Evaluation Images: 700 (100 per category balanced)
          </span>
        </div>
      </div>

      {/* Scikit-Learn Classification Report Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Detailed Classification Report (Precision, Recall, F1-Score)
          </h3>
          <span className="text-xs text-slate-400">
            Computed via <code className="text-emerald-300">sklearn.metrics.classification_report</code>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider bg-slate-950/60">
                <th className="py-2.5 px-4 font-semibold">Garbage Class</th>
                <th className="py-2.5 px-4 font-semibold text-right">Precision</th>
                <th className="py-2.5 px-4 font-semibold text-right">Recall</th>
                <th className="py-2.5 px-4 font-semibold text-right">F1-Score</th>
                <th className="py-2.5 px-4 font-semibold text-right">Support</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {CLASSIFICATION_REPORT.map((row) => {
                const isHighlight = row.category.includes('Accuracy') || row.category.includes('Average');
                return (
                  <tr
                    key={row.category}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isHighlight ? 'bg-slate-950/80 font-bold text-white' : 'text-slate-300'
                    }`}
                  >
                    <td className="py-2 px-4 font-sans font-medium flex items-center gap-2">
                      {isHighlight ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      ) : null}
                      <span>{row.category}</span>
                    </td>
                    <td className="py-2 px-4 text-right text-emerald-400 font-semibold">
                      {(row.precision * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 px-4 text-right text-teal-400 font-semibold">
                      {(row.recall * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 px-4 text-right text-cyan-400 font-semibold">
                      {row.f1.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 text-right text-slate-400">
                      {row.support}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MobileNetV2 Deep Architecture Flow */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            Neural Network Architecture Breakdown (MobileNetV2 Transfer Learning)
          </h3>
          <span className="text-xs text-slate-400">
            Lightweight inverted residual bottlenecks with linear activations (~3.5 million parameters)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Layer 1: Input</span>
            <span className="text-xs font-mono font-bold text-white block">224 × 224 × 3</span>
            <span className="text-[9px] text-slate-500">Normalized RGB Tensor</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
            <span className="text-[10px] text-emerald-400 block mb-1">Layer 2: Base CNN</span>
            <span className="text-xs font-mono font-bold text-emerald-300 block">MobileNetV2</span>
            <span className="text-[9px] text-slate-500">ImageNet Frozen Weights</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Layer 3: Pooling</span>
            <span className="text-xs font-mono font-bold text-white block">GlobalAvgPool2D</span>
            <span className="text-[9px] text-slate-500">Vector: 1,280 features</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Layer 4: Regularization</span>
            <span className="text-xs font-mono font-bold text-white block">BatchNorm + Drop</span>
            <span className="text-[9px] text-slate-500">Dropout rate = 0.35</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Layer 5: Hidden Head</span>
            <span className="text-xs font-mono font-bold text-white block">Dense (128)</span>
            <span className="text-[9px] text-slate-500">Activation = ReLU</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/50">
            <span className="text-[10px] text-emerald-400 block mb-1">Layer 6: Output</span>
            <span className="text-xs font-mono font-bold text-emerald-300 block">Dense (7, Softmax)</span>
            <span className="text-[9px] text-slate-500">Class Probabilities</span>
          </div>
        </div>
      </div>
    </div>
  );
};
