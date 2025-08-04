export interface ArrayElement {
  value: number;
  index: number;
  status: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'partition';
  color?: string;
}

export interface AlgorithmState {
  array: ArrayElement[];
  step: number;
  totalSteps: number;
  description: string;
  isComplete: boolean;
}

export interface VisualizationSettings {
  speed: number;
  autoPlay: boolean;
  showStepDescription: boolean;
  arraySize: number;
}

export type AlgorithmType = 'bubble-sort' | 'selection-sort' | 'insertion-sort' | 'merge-sort' | 'quick-sort' | 'heap-sort';

export interface AlgorithmConfig {
  name: string;
  type: AlgorithmType;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  bestCase: string;
  averageCase: string;
  worstCase: string;
} 