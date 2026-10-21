import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  CheckCircle2, 
  Download, 
  Terminal, 
  FileCode, 
  FolderTree, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PYTHON_PROJECT_FILES, CodeFile } from '../data/pythonCode';
import { downloadProjectZip } from '../utils/projectZip';

export const CodeExplorerTab: React.FC = () => {
  const [activeFile, setActiveFile] = useState<CodeFile>(PYTHON_PROJECT_FILES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadProjectZip();
    } finally {
      setIsDownloading(false);
    }
  };

  const codeLines = activeFile.code.split('\n');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" />
              Complete Python Project Source Code & Scripts
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Production-ready, well-commented Python scripts for training, computer vision preprocessing, and Streamlit UI.
            </p>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download All as .ZIP</span>
          </button>
        </div>
      </div>

      {/* Main IDE Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: File Tree & Execution Commands (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* File Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <FolderTree className="w-4 h-4 text-emerald-400" />
              Project Files
            </span>
            <div className="space-y-1">
              {PYTHON_PROJECT_FILES.map((file) => (
                <button
                  key={file.filename}
                  onClick={() => setActiveFile(file)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between border ${
                    activeFile.filename === file.filename
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="truncate font-mono">{file.filename}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">
                    {file.language}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Windows & Linux Commands Quick Reference */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Windows Run Commands
            </span>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">1. Create & Activate Virtual Env:</span>
                <pre className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-300">
                  python -m venv env<br/>
                  env\Scripts\activate
                </pre>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1">2. Install Dependencies:</span>
                <pre className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-300">
                  pip install -r requirements.txt
                </pre>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1">3. Train Deep Learning Model:</span>
                <pre className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-300">
                  python train_model.py --epochs 25
                </pre>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1">4. Launch Streamlit Web App:</span>
                <pre className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-300">
                  streamlit run app.py
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Code Viewer (8 cols) */}
        <div className="lg:col-span-8 space-y-2">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            {/* Top Code Header */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-white block">
                    {activeFile.filename}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {activeFile.description}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                title="Copy entire file content to clipboard"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy File</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content with Line Numbers */}
            <div className="p-4 bg-slate-950/90 overflow-x-auto max-h-[640px] font-mono text-xs text-slate-200 leading-relaxed scrollbar-thin">
              <div className="table w-full">
                {codeLines.map((line, idx) => (
                  <div key={idx} className="table-row hover:bg-slate-800/40">
                    <span className="table-cell select-none pr-4 text-right text-slate-600 text-[11px] w-10">
                      {idx + 1}
                    </span>
                    <span className="table-cell whitespace-pre font-mono text-[11px]">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
