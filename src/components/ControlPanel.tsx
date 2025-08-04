import React from 'react';
import { motion } from 'framer-motion';
import { AlgorithmType, VisualizationSettings } from '../types/algorithm';

interface ControlPanelProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  selectedAlgorithm: AlgorithmType;
  settings: VisualizationSettings;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
  onSettingsChange: (settings: Partial<VisualizationSettings>) => void;
  onGenerateNewArray: () => void;
}

const algorithms = [
  { type: 'bubble-sort' as AlgorithmType, name: 'Bubble Sort' },
  { type: 'selection-sort' as AlgorithmType, name: 'Selection Sort' },
  { type: 'insertion-sort' as AlgorithmType, name: 'Insertion Sort' },
  { type: 'merge-sort' as AlgorithmType, name: 'Merge Sort' },
  { type: 'quick-sort' as AlgorithmType, name: 'Quick Sort' },
  { type: 'heap-sort' as AlgorithmType, name: 'Heap Sort' },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isPlaying,
  currentStep,
  totalSteps,
  selectedAlgorithm,
  settings,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  onAlgorithmChange,
  onSettingsChange,
  onGenerateNewArray,
}) => {
  return (
    <div className="control-panel">
      <div className="control-section">
        <h3>Algorithm Selection</h3>
        <div className="algorithm-buttons">
          {algorithms.map((algorithm) => (
            <motion.button
              key={algorithm.type}
              className={`algorithm-btn ${selectedAlgorithm === algorithm.type ? 'active' : ''}`}
              onClick={() => onAlgorithmChange(algorithm.type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {algorithm.name}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="control-section">
        <h3>Array Settings</h3>
        <div className="array-settings">
          <div className="setting-item">
            <label>Array Size:</label>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={settings.arraySize}
              onChange={(e) => onSettingsChange({ arraySize: parseInt(e.target.value) })}
            />
            <span>{settings.arraySize} elements</span>
          </div>
        </div>
      </div>

      <div className="control-section">
        <h3>Playback Controls</h3>
        <div className="playback-controls">
          <motion.button
            className="control-btn"
            onClick={onStepBackward}
            disabled={currentStep <= 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⏮️ Step Back
          </motion.button>
          
          <motion.button
            className={`control-btn ${isPlaying ? 'playing' : ''}`}
            onClick={isPlaying ? onPause : onPlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </motion.button>
          
          <motion.button
            className="control-btn"
            onClick={onStepForward}
            disabled={currentStep >= totalSteps}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⏭️ Step Forward
          </motion.button>
          
          <motion.button
            className="control-btn reset"
            onClick={onReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Reset
          </motion.button>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="step-info">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      <div className="control-section">
        <h3>Settings</h3>
        <div className="settings">
          <div className="setting-item">
            <label>Speed:</label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={settings.speed}
              onChange={(e) => onSettingsChange({ speed: parseFloat(e.target.value) })}
            />
            <span>{settings.speed}x</span>
          </div>
          
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.autoPlay}
                onChange={(e) => onSettingsChange({ autoPlay: e.target.checked })}
              />
              Auto-play
            </label>
          </div>
          
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.showStepDescription}
                onChange={(e) => onSettingsChange({ showStepDescription: e.target.checked })}
              />
              Show descriptions
            </label>
          </div>
        </div>
      </div>

      <div className="control-section">
        <motion.button
          className="generate-btn"
          onClick={onGenerateNewArray}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎲 Generate New Array
        </motion.button>
      </div>
    </div>
  );
}; 