import React, { useState } from 'react';
import { 
  HelpCircle, 
  Presentation, 
  Mic, 
  Lightbulb, 
  CheckCircle2, 
  Search, 
  Filter, 
  Copy, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ELEVATOR_PITCH, PRESENTATION_SLIDES, VIVA_QUESTIONS } from '../data/vivaAndPresentation';
import { VivaQuestion } from '../types/garbage';

export const VivaPresentationTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'pitch' | 'slides' | 'viva' | 'concepts'>('pitch');
  const [vivaSearch, setVivaSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [expandedVivaId, setExpandedVivaId] = useState<number | null>(1);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Pitch timer
  const [pitchTimeLeft, setPitchTimeLeft] = useState<number>(120);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && pitchTimeLeft > 0) {
      interval = setInterval(() => {
        setPitchTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (pitchTimeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, pitchTimeLeft]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Filter Viva questions
  const filteredQuestions = VIVA_QUESTIONS.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(vivaSearch.toLowerCase()) ||
                          q.answer.toLowerCase().includes(vivaSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Presentation className="w-5 h-5 text-emerald-400" />
              Mini-Project Presentation & Viva Voce Exam Guide
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive preparation kit for college viva examinations, slide deck defense, and examiner demonstrations.
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveSubTab('pitch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'pitch'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2-Min Pitch
            </button>
            <button
              onClick={() => setActiveSubTab('slides')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'slides'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              10 PPT Slides
            </button>
            <button
              onClick={() => setActiveSubTab('viva')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'viva'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              25 Viva Q&A
            </button>
            <button
              onClick={() => setActiveSubTab('concepts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'concepts'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Core Concepts
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Tab 1: 2-Minute Elevator Pitch */}
      {activeSubTab === 'pitch' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Mic className="w-5 h-5 text-emerald-400" />
                  2-Minute Viva Pitch Script (Examiner Introduction)
                </h3>
                <span className="text-xs text-slate-400">
                  Speak this verbatim to open your mini-project presentation confidently.
                </span>
              </div>

              {/* Practice Timer */}
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
                <span className="text-xs text-slate-400 font-mono">Timer:</span>
                <span className={`text-sm font-mono font-bold ${pitchTimeLeft < 20 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {Math.floor(pitchTimeLeft / 60)}:{(pitchTimeLeft % 60).toString().padStart(2, '0')}
                </span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-300 transition-colors"
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => { setIsTimerRunning(false); setPitchTimeLeft(120); }}
                  className="p-1 hover:bg-slate-800 rounded text-slate-300 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Script card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm leading-relaxed space-y-3 font-serif">
              {ELEVATOR_PITCH.trim().split('\n\n').map((para, i) => (
                <p key={i}>{para.replace(/^"|"$/g, '')}</p>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleCopy(ELEVATOR_PITCH, 'pitch')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                {copiedText === 'pitch' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Pitch Script!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: 10 PPT Slides */}
      {activeSubTab === 'slides' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              10 structured slides matching standard University Engineering presentation rubrics:
            </span>
            <button
              onClick={() => {
                let text = '# PPT SLIDES OUTLINE\n\n';
                PRESENTATION_SLIDES.forEach(s => {
                  text += `## Slide ${s.slideNumber}: ${s.title}\n`;
                  s.keyPoints.forEach(kp => text += `- ${kp}\n`);
                  text += `Visual: ${s.visualSuggestion}\n`;
                  text += `Speaker Notes: ${s.speakerNotes}\n\n`;
                });
                handleCopy(text, 'all-slides');
              }}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              {copiedText === 'all-slides' ? 'Copied Slides Outline!' : 'Copy All Slides Text'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRESENTATION_SLIDES.map((slide) => (
              <div
                key={slide.slideNumber}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      Slide {slide.slideNumber} of 10
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2">
                    {slide.title}
                  </h4>

                  <ul className="space-y-1 pl-4 list-disc text-xs text-slate-300">
                    {slide.keyPoints.map((point, idx) => (
                      <li key={idx} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800/80">
                  <div className="p-2.5 rounded-lg bg-slate-950 text-[11px] border border-slate-800/60">
                    <span className="text-emerald-400 font-semibold block mb-0.5">Recommended Visual:</span>
                    <span className="text-slate-400">{slide.visualSuggestion}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/70 text-[11px] border border-slate-800/40">
                    <span className="text-amber-400 font-semibold block mb-0.5">Presenter Verbal Notes:</span>
                    <p className="text-slate-300 italic">"{slide.speakerNotes}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: 25 Viva Questions & Answers */}
      {activeSubTab === 'viva' && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search question, keyword, or concept..."
                value={vivaSearch}
                onChange={(e) => setVivaSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Topics (4)</option>
                <option value="Computer Vision">Computer Vision</option>
                <option value="Deep Learning">Deep Learning</option>
                <option value="Project Architecture">Project Architecture</option>
                <option value="Evaluation & Deployment">Evaluation & Deployment</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Difficulties</option>
                <option value="Basic">Basic (College 2nd Year)</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced (Examiner questions)</option>
              </select>
            </div>
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-2.5">
            {filteredQuestions.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
                No matching viva questions found. Try adjusting your search query.
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const isExpanded = expandedVivaId === q.id;
                return (
                  <div
                    key={q.id}
                    className={`bg-slate-900 border rounded-2xl transition-all duration-200 overflow-hidden ${
                      isExpanded ? 'border-emerald-500/40 shadow-md ring-1 ring-emerald-500/20' : 'border-slate-800'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedVivaId(isExpanded ? null : q.id)}
                      className="w-full text-left p-4 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center border border-slate-800 flex-shrink-0">
                          {q.id}
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-white">
                            {q.question}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                              {q.category}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                q.difficulty === 'Basic'
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : q.difficulty === 'Intermediate'
                                  ? 'bg-amber-500/10 text-amber-400'
                                  : 'bg-rose-500/10 text-rose-400'
                              }`}
                            >
                              {q.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 bg-slate-950/40 space-y-3">
                        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed">
                          <span className="text-emerald-400 font-bold block mb-1">
                            Examiner Answer:
                          </span>
                          {q.answer}
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleCopy(q.answer, `q-${q.id}`)}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                          >
                            {copiedText === `q-${q.id}` ? (
                              <span className="text-emerald-400">Copied answer!</span>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Answer</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Core Concepts for 2nd Year Students */}
      {activeSubTab === 'concepts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              OpenCV vs Deep Learning: The Synergy
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>OpenCV</strong> is a deterministic computer vision library based on mathematical matrix operations (convolution kernels, gradient Sobel filters, morphological erosion/dilation). It does not "learn" from data; it cleans and extracts bounding geometries.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Deep Learning</strong> uses multilayer neural networks that learn statistical feature representations (low-level edges, textures, object parts, class identities) directly from thousands of training images via backpropagation.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-teal-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-teal-400" />
              What is Depthwise Separable Convolution?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standard 2D convolution applies a 3D filter across all spatial and channel dimensions at once. <strong>MobileNetV2</strong> splits this into two steps:
            </p>
            <ol className="text-xs text-slate-300 list-decimal pl-4 space-y-1">
              <li><strong>Depthwise Convolution:</strong> A single 3x3 filter per input channel to extract spatial features independently.</li>
              <li><strong>Pointwise Convolution:</strong> A 1x1 convolution to linearly combine the channels into new features.</li>
            </ol>
            <p className="text-[11px] text-slate-400">
              Result: 8 to 9 times fewer computations with minimal loss in classification accuracy!
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              Why Transfer Learning is Ideal for Mini-Projects
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              College mini-projects rarely have access to cluster GPUs or 100,000 domain images. With <strong>Transfer Learning</strong>:
            </p>
            <ul className="text-xs text-slate-300 list-disc pl-4 space-y-1">
              <li>The lower layers already recognize generic edges, curves, and textures from ImageNet.</li>
              <li>We freeze the base model and only train our custom 128-neuron dense head.</li>
              <li>Training converges in under 20 minutes on a standard CPU.</li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Examiner Live Demo Checklist
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Open the "Live Classifier" tab and select the <strong>Plastic Water Bottle</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Show the OpenCV ROI Bounding Box overlay and Canny edge map.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Point out the <strong>Yellow Bin</strong> recommendation and 450-year degradation timeline.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Switch to the "OpenCV Vision Lab" to show real-time Canny threshold adjustments.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
