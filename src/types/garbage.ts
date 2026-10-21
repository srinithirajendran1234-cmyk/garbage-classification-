export type GarbageCategory =
  | 'Plastic'
  | 'Paper'
  | 'Cardboard'
  | 'Glass'
  | 'Metal'
  | 'Organic Waste'
  | 'General / Other Waste';

export interface CategoryInfo {
  id: GarbageCategory;
  name: string;
  binColor: string;
  binHex: string;
  icon: string;
  description: string;
  disposalMethod: string;
  recyclingSteps: string[];
  degradationTime: string;
  recyclability: 'High' | 'Medium' | 'Low' | 'Compostable' | 'Special Handling';
  commonItems: string[];
  contaminationWarning: string;
}

export interface PredictionResult {
  category: GarbageCategory;
  confidence: number; // 0 to 1
  probabilities: Record<GarbageCategory, number>;
  detectedBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  features?: {
    dominantColor: string;
    contourCount: number;
    aspectRatio: number;
    edgeDensity: number;
  };
}

export interface SampleGarbageItem {
  id: string;
  name: string;
  category: GarbageCategory;
  description: string;
  imageUrl: string;
  svgData?: string;
}

export interface VivaQuestion {
  id: number;
  question: string;
  answer: string;
  category: 'Computer Vision' | 'Deep Learning' | 'Project Architecture' | 'Evaluation & Deployment';
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
}

export interface PresentationSlide {
  slideNumber: number;
  title: string;
  keyPoints: string[];
  visualSuggestion: string;
  speakerNotes: string;
}
