import React from 'react';
import { AlgorithmType, AlgorithmConfig } from '../types/algorithm';

interface AlgorithmInfoProps {
  selectedAlgorithm: AlgorithmType;
}

const algorithmConfigs: Record<AlgorithmType, AlgorithmConfig> = {
  'bubble-sort': {
    name: 'Bubble Sort',
    type: 'bubble-sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    bestCase: 'O(n)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)'
  },
  'selection-sort': {
    name: 'Selection Sort',
    type: 'selection-sort',
    description: 'An in-place comparison sorting algorithm that divides the input list into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    bestCase: 'O(n²)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)'
  },
  'insertion-sort': {
    name: 'Insertion Sort',
    type: 'insertion-sort',
    description: 'A simple sorting algorithm that builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    bestCase: 'O(n)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)'
  },
  'merge-sort': {
    name: 'Merge Sort',
    type: 'merge-sort',
    description: 'A divide-and-conquer algorithm that recursively breaks down a problem into two or more sub-problems until they become simple enough to solve directly.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n log n)'
  },
  'quick-sort': {
    name: 'Quick Sort',
    type: 'quick-sort',
    description: 'A highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy to sort elements.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n²)'
  },
  'heap-sort': {
    name: 'Heap Sort',
    type: 'heap-sort',
    description: 'A comparison-based sorting algorithm that uses a binary heap data structure to sort elements.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n log n)'
  }
};

export const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ selectedAlgorithm }) => {
  const config = algorithmConfigs[selectedAlgorithm];

  return (
    <div className="algorithm-info">
      <h3>{config.name}</h3>
      <p className="description">{config.description}</p>
      
      <div className="complexity-grid">
        <div className="complexity-item">
          <span className="label">Time Complexity:</span>
          <span className="value">{config.timeComplexity}</span>
        </div>
        <div className="complexity-item">
          <span className="label">Space Complexity:</span>
          <span className="value">{config.spaceComplexity}</span>
        </div>
      </div>
      
      <div className="case-analysis">
        <h4>Performance Analysis:</h4>
        <div className="case-grid">
          <div className="case-item">
            <span className="case-label">Best Case:</span>
            <span className="case-value">{config.bestCase}</span>
          </div>
          <div className="case-item">
            <span className="case-label">Average Case:</span>
            <span className="case-value">{config.averageCase}</span>
          </div>
          <div className="case-item">
            <span className="case-label">Worst Case:</span>
            <span className="case-value">{config.worstCase}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 