import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrayElement } from '../types/algorithm';

interface ArrayVisualizerProps {
  elements: ArrayElement[];
  maxValue?: number;
  key?: string | number; // Add key prop to trigger re-animation
}

const getStatusColor = (status: ArrayElement['status']): string => {
  switch (status) {
    case 'comparing':
      return '#ff6b6b';
    case 'swapping':
      return '#4ecdc4';
    case 'sorted':
      return '#51cf66';
    case 'pivot':
      return '#ffd93d';
    case 'partition':
      return '#ff8a80';
    default:
      return '#6c757d';
  }
};

const getStatusBackground = (status: ArrayElement['status']): string => {
  switch (status) {
    case 'comparing':
      return '#ffe3e3';
    case 'swapping':
      return '#e3f2fd';
    case 'sorted':
      return '#e8f5e8';
    case 'pivot':
      return '#fff8e1';
    case 'partition':
      return '#ffebee';
    default:
      return '#f8f9fa';
  }
};

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ 
  elements, 
  maxValue = Math.max(...elements.map(el => el.value), 100),
  key
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate bar width to ensure all bars fit within container
  const getBarWidth = () => {
    const gap = 8; // Gap between bars
    const padding = 40; // Container padding
    const borderWidth = 2; // Border width per bar
    
    // Calculate total space needed for gaps
    const totalGapSpace = gap * (elements.length - 1);
    
    // Calculate total space needed for borders
    const totalBorderSpace = borderWidth * 2 * elements.length;
    
    // Calculate available width for bar content
    const availableWidth = containerWidth - padding - totalGapSpace - totalBorderSpace;
    
    // Calculate width per bar (no minimum constraint)
    const widthPerBar = Math.max(1, availableWidth / elements.length);
    
    return widthPerBar;
  };

  const barWidth = getBarWidth();

  // Calculate dynamic font sizes based on bar width
  const getFontSizes = (width: number) => {
    const minWidth = 10; // Minimum width for readable text
    const maxWidth = 60; // Maximum width for large text
    
    // Clamp width between min and max for font calculation
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
    
    // Calculate font sizes proportionally
    const valueFontSize = Math.max(6, Math.min(16, Math.floor(clampedWidth * 0.4)));
    const indexFontSize = Math.max(4, Math.min(12, Math.floor(clampedWidth * 0.25)));
    
    return { valueFontSize, indexFontSize };
  };

  const { valueFontSize, indexFontSize } = getFontSizes(barWidth);

  return (
    <div className="array-visualizer">
      <div className="array-container" ref={containerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={key || 'array'}
            className="array-elements-container"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '8px',
              width: '100%'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 200
            }}
          >
            {elements.map((element, index) => {
              const height = (element.value / maxValue) * 300;
              const color = getStatusColor(element.status);
              const backgroundColor = getStatusBackground(element.status);
              
              return (
                <motion.div
                  key={`${element.value}-${index}`}
                  className="array-element"
                  style={{
                    height: `${height}px`,
                    width: `${barWidth}px`,
                    backgroundColor: color,
                    borderColor: color,
                    background: `linear-gradient(135deg, ${backgroundColor} 0%, ${color} 100%)`,
                  }}
                  initial={{ 
                    scale: 0.8, 
                    opacity: 0,
                    y: 50 // Start from just below the bottom of the container
                  }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: element.status === 'swapping' ? -10 : 0
                  }}
                  transition={{ 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 300,
                    delay: index * 0.05 // Stagger animation
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                  }}
                >
                  <span 
                    className="element-value"
                    style={{ fontSize: `${valueFontSize}px` }}
                  >
                    {element.value}
                  </span>
                  <span 
                    className="element-index"
                    style={{ fontSize: `${indexFontSize}px` }}
                  >
                    {index}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}; 