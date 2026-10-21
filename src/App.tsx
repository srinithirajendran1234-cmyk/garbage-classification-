import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { ClassifierTab } from './components/ClassifierTab';
import { OpenCVPipelineTab } from './components/OpenCVPipelineTab';
import { ModelEvaluationTab } from './components/ModelEvaluationTab';
import { CodeExplorerTab } from './components/CodeExplorerTab';
import { AcademicReportTab } from './components/AcademicReportTab';
import { VivaPresentationTab } from './components/VivaPresentationTab';
import { Recycle, GraduationCap, Github, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('classifier');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Sticky Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'classifier' && <ClassifierTab />}
        {activeTab === 'opencv' && <OpenCVPipelineTab />}
        {activeTab === 'evaluation' && <ModelEvaluationTab />}
        {activeTab === 'code' && <CodeExplorerTab />}
        {activeTab === 'report' && <AcademicReportTab />}
        {activeTab === 'viva' && <VivaPresentationTab />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 text-slate-400 text-xs py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Recycle className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">EcoVision AI Project</span>
            <span>•</span>
            <span>Garbage Classification and Detection Using OpenCV, Machine Learning & AI</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Built with OpenCV & TensorFlow/Keras MobileNetV2</span>
            <span>•</span>
            <span>Academic Mini-Project Submission</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
