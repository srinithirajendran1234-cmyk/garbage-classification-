import React, { useState } from 'react';
import { 
  Recycle, 
  Download, 
  CheckCircle2, 
  Layers, 
  GraduationCap, 
  Sparkles,
  Camera,
  Code2,
  BarChart3,
  BookOpen,
  HelpCircle,
  Eye
} from 'lucide-react';
import { downloadProjectZip } from '../utils/projectZip';

export type NavTab = 'classifier' | 'opencv' | 'evaluation' | 'code' | 'report' | 'viva';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadProjectZip();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'classifier', label: 'Live Classifier', icon: <Camera className="w-4 h-4" /> },
    { id: 'opencv', label: 'OpenCV Vision Lab', icon: <Eye className="w-4 h-4" /> },
    { id: 'evaluation', label: 'Model Evaluation', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'code', label: 'Python Source Code', icon: <Code2 className="w-4 h-4" />, badge: '6 files' },
    { id: 'report', label: 'Academic Report', icon: <BookOpen className="w-4 h-4" />, badge: '18 Ch.' },
    { id: 'viva', label: 'Viva & Slides', icon: <HelpCircle className="w-4 h-4" />, badge: '25 Q&A' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      {/* Top Academic Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white text-xs font-medium py-1.5 px-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 flex-shrink-0" />
          <span>Academic Mini-Project: <strong>Garbage Classification and Detection using OpenCV & AI</strong></span>
          <span className="hidden sm:inline bg-black/25 px-2 py-0.5 rounded-full text-[11px]">MobileNetV2 + 7 Classes</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            Test Accuracy: <strong>92.1%</strong>
          </span>
          <span className="hidden md:inline text-white/80">Input: 224×224 RGB</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
            <Recycle className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                EcoVision AI
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                v2.4 Final
              </span>
            </div>
            <p className="text-xs text-slate-400">
              OpenCV Computer Vision • Deep Learning CNN • Smart Municipal Segregation
            </p>
          </div>
        </div>

        {/* Action Button: Download Full Project ZIP */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shadow-md ${
              downloadSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:shadow-emerald-500/20 active:scale-95'
            }`}
            title="Download ready-to-run Python project ZIP containing app.py, train_model.py, predict.py, report & viva guide"
          >
            {isDownloading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Zipping Project...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Project Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Python Project (.zip)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto border-t border-slate-800 scrollbar-none">
        {navItems.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
};
