import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Copy, 
  CheckCircle2, 
  Download, 
  ChevronRight, 
  Printer,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ACADEMIC_REPORT_SECTIONS, ReportSection } from '../data/academicDocumentation';

export const AcademicReportTab: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const filteredSections = ACADEMIC_REPORT_SECTIONS.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentSec = ACADEMIC_REPORT_SECTIONS.find(s => s.number === selectedSection) || ACADEMIC_REPORT_SECTIONS[0];

  const handleCopySection = () => {
    navigator.clipboard.writeText(currentSec.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyFullReport = () => {
    let full = '# ACADEMIC MINI-PROJECT REPORT: ECOVISION\n\n';
    ACADEMIC_REPORT_SECTIONS.forEach(s => {
      full += `\n## Section ${s.number}: ${s.title}\n`;
      full += s.content + '\n\n---\n';
    });
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              Complete Academic Project Report (18 Chapters)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Formal mini-project documentation formatted for academic project submissions and viva evaluation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyFullReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              title="Copy complete 18-chapter report in Markdown format"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Full Report!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Full Report (.md)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Chapters Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chapter Index (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            {/* Search Box */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search chapters or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1 max-h-[580px] overflow-y-auto scrollbar-thin pr-1">
              {filteredSections.map((sec) => (
                <button
                  key={sec.number}
                  onClick={() => setSelectedSection(sec.number)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 border ${
                    selectedSection === sec.number
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-white font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md flex-shrink-0 ${
                      selectedSection === sec.number
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Ch. {sec.number}
                  </span>
                  <div className="truncate">
                    <span className="block truncate text-xs">{sec.title}</span>
                    <span className="block truncate text-[10px] text-slate-500">{sec.summary}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content Viewer (8 cols) */}
        <div className="lg:col-span-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Chapter {currentSec.number} of 18
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {currentSec.title}
                </h3>
              </div>

              <button
                onClick={handleCopySection}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                title="Copy current chapter"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Chapter</span>
                  </>
                )}
              </button>
            </div>

            {/* Special System Architecture Diagram Callout for Chapter 9 */}
            {currentSec.number === 9 && (
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 my-4 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  Interactive System Architecture Flowchart
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-mono">Stage 1</span>
                    <span className="font-bold text-white text-[11px]">Image Acquisition</span>
                    <span className="text-[9px] text-slate-500 block">Webcam / JPG Upload</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-emerald-400 block font-mono">Stage 2</span>
                    <span className="font-bold text-emerald-300 text-[11px]">OpenCV Filtering</span>
                    <span className="text-[9px] text-slate-500 block">Gaussian & Canny Edge</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-cyan-400 block font-mono">Stage 3</span>
                    <span className="font-bold text-cyan-300 text-[11px]">MobileNetV2 CNN</span>
                    <span className="text-[9px] text-slate-500 block">Softmax Probability</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-amber-400 block font-mono">Stage 4</span>
                    <span className="font-bold text-amber-300 text-[11px]">Recycling Advisory</span>
                    <span className="text-[9px] text-slate-500 block">Bin Color & Preparation</span>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter Body formatted */}
            <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4">
              {currentSec.content.split('\n\n').map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                // Markdown Heading 1 or 2
                if (trimmed.startsWith('# ')) {
                  return (
                    <h1 key={idx} className="text-xl font-bold text-white pt-2 border-b border-slate-800 pb-2">
                      {trimmed.replace('# ', '')}
                    </h1>
                  );
                }
                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-base font-bold text-emerald-300 pt-2">
                      {trimmed.replace('## ', '')}
                    </h2>
                  );
                }
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-sm font-semibold text-slate-200 pt-1">
                      {trimmed.replace('### ', '')}
                    </h3>
                  );
                }

                // Table parsing (simple pipe table)
                if (trimmed.includes('|') && trimmed.includes('\n')) {
                  const lines = trimmed.split('\n');
                  const header = lines[0].split('|').map(s => s.trim()).filter(Boolean);
                  const rows = lines.slice(2).map(line => line.split('|').map(s => s.trim()).filter(Boolean));
                  return (
                    <div key={idx} className="overflow-x-auto my-3">
                      <table className="w-full text-left text-xs border border-slate-800 rounded-lg">
                        <thead className="bg-slate-950 text-slate-300 uppercase text-[10px]">
                          <tr>
                            {header.map((h, i) => (
                              <th key={i} className="py-2 px-3 border-b border-slate-800 font-semibold">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80">
                          {rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-800/30">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="py-2 px-3 text-slate-300">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                // Code block or Mermaid block
                if (trimmed.startsWith('```')) {
                  const codeContent = trimmed.replace(/```[a-z]*\n?/g, '');
                  return (
                    <pre key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                      <code>{codeContent}</code>
                    </pre>
                  );
                }

                // Bullet list
                if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
                  const items = trimmed.split('\n');
                  return (
                    <ul key={idx} className="space-y-1.5 pl-4 list-disc text-slate-300">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx} className="leading-relaxed">
                          {item.replace(/^[0-9]+\.\s+|^-\s+/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p key={idx} className="leading-relaxed text-slate-300">
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Bottom Chapter Pagination */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              {currentSec.number > 1 ? (
                <button
                  onClick={() => setSelectedSection(currentSec.number - 1)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <span>← Previous Chapter</span>
                </button>
              ) : <div />}

              {currentSec.number < 18 ? (
                <button
                  onClick={() => setSelectedSection(currentSec.number + 1)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5"
                >
                  <span>Next: Chapter {currentSec.number + 1} →</span>
                </button>
              ) : <div />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
