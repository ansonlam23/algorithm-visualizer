import React, { useState, useEffect, useCallback } from 'react';
import { ArrayVisualizer } from './components/ArrayVisualizer';
import { ControlPanel } from './components/ControlPanel';
import { AlgorithmInfo } from './components/AlgorithmInfo';
import { SortingAlgorithms } from './algorithms/sortingAlgorithms';
import { AlgorithmType, AlgorithmState, VisualizationSettings } from './types/algorithm';
import './App.css';

function App() {
  const [array, setArray] = useState<number[]>([]);
  const [algorithmStates, setAlgorithmStates] = useState<AlgorithmState[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('bubble-sort');
  const [arrayKey, setArrayKey] = useState(0); // Add key for triggering animations
  const [settings, setSettings] = useState<VisualizationSettings>({
    speed: 1,
    autoPlay: false,
    showStepDescription: true,
    arraySize: 10,
  });

  // Generate initial array
  useEffect(() => {
    generateNewArray();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && currentStep < algorithmStates.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000 / settings.speed);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep >= algorithmStates.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, algorithmStates.length, settings.speed]);

  const generateAlgorithmStates = useCallback((inputArray: number[], algorithm: AlgorithmType) => {
    let states: AlgorithmState[] = [];
    
    // Create initial state with default status
    const initialElements = inputArray.map((value, index) => ({
      value,
      index,
      status: 'default' as const
    }));
    
    // Add initial state
    states.push({
      array: initialElements,
      step: 0,
      totalSteps: 0,
      description: 'Starting sort',
      isComplete: false
    });
    
    let algorithmStates: AlgorithmState[] = [];
    
    switch (algorithm) {
      case 'bubble-sort':
        algorithmStates = SortingAlgorithms.bubbleSort(inputArray);
        break;
      case 'selection-sort':
        algorithmStates = SortingAlgorithms.selectionSort(inputArray);
        break;
      case 'insertion-sort':
        algorithmStates = SortingAlgorithms.insertionSort(inputArray);
        break;
      case 'merge-sort':
        algorithmStates = SortingAlgorithms.mergeSort(inputArray);
        break;
      case 'quick-sort':
        algorithmStates = SortingAlgorithms.quickSort(inputArray);
        break;
      case 'heap-sort':
        algorithmStates = SortingAlgorithms.heapSort(inputArray);
        break;
      default:
        algorithmStates = SortingAlgorithms.bubbleSort(inputArray);
    }
    
    // Remove the first state from algorithm states (since we added our own)
    // and adjust the step numbers
    const adjustedStates = algorithmStates.slice(1).map((state, index) => ({
      ...state,
      step: state.step
    }));
    
    states = states.concat(adjustedStates);
    
    setAlgorithmStates(states);
  }, []);

  const generateNewArray = useCallback(() => {
    const newArray = SortingAlgorithms.generateRandomArray(settings.arraySize, 1, 50);
    setArray(newArray);
    setCurrentStep(0);
    setIsPlaying(false);
    setArrayKey(prev => prev + 1); // Increment key to trigger animation
    
    // Create initial state with all elements as default (not sorted)
    const initialElements = newArray.map((value, index) => ({
      value,
      index,
      status: 'default' as const
    }));
    
    // Set initial state without algorithm states
    setAlgorithmStates([{
      array: initialElements,
      step: 0,
      totalSteps: 0,
      description: 'Generated new array',
      isComplete: false
    }]);
  }, [selectedAlgorithm, settings.arraySize]);

  const handlePlay = () => {
    // Only start playing if we have algorithm states to step through
    if (algorithmStates.length > 1) {
      setIsPlaying(true);
    } else if (array.length > 0) {
      // Generate algorithm states and then start playing
      generateAlgorithmStates(array, selectedAlgorithm);
      setTimeout(() => setIsPlaying(true), 500);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < algorithmStates.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleSettingsChange = (newSettings: Partial<VisualizationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    
    // Regenerate array if array size changed
    if (newSettings.arraySize && newSettings.arraySize !== settings.arraySize) {
      setTimeout(() => generateNewArray(), 0);
    }
  };

  const handleAlgorithmChange = useCallback((algorithm: AlgorithmType) => {
    setSelectedAlgorithm(algorithm);
    setCurrentStep(0);
    setIsPlaying(false);
    // Use the current array, don't generate a new one
    if (array.length > 0) {
      generateAlgorithmStates(array, algorithm);
    }
  }, [array, generateAlgorithmStates]);

  const currentState = algorithmStates[currentStep] || { array: [], step: 0, totalSteps: 0, description: '', isComplete: false };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎯 Algorithm Visualizer</h1>
        <p>Interactive visualization of sorting algorithms</p>
      </header>

      <main className="App-main">
        <div className="visualization-container">
          <ArrayVisualizer 
            elements={currentState.array} 
            maxValue={Math.max(...array, 50)}
            key={arrayKey}
          />
          
          {settings.showStepDescription && currentState.description && (
            <div className="step-description">
              <p>{currentState.description}</p>
            </div>
          )}
        </div>

        <div className="info-and-controls">
          <div className="algorithm-info-container">
            <AlgorithmInfo selectedAlgorithm={selectedAlgorithm} />
          </div>
          
          <ControlPanel
            isPlaying={isPlaying}
            currentStep={currentStep}
            totalSteps={algorithmStates.length - 1}
            selectedAlgorithm={selectedAlgorithm}
            settings={settings}
            onPlay={handlePlay}
            onPause={handlePause}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onReset={handleReset}
            onAlgorithmChange={handleAlgorithmChange}
            onSettingsChange={handleSettingsChange}
            onGenerateNewArray={generateNewArray}
          />
        </div>
      </main>

      <footer className="App-footer">
        <p>Built with React, TypeScript, and Framer Motion</p>
      </footer>
    </div>
  );
}

export default App;
