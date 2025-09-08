# Algorithm Visualizer

An interactive web application that visualizes sorting algorithms in real-time. Built with React and TypeScript, this tool helps users understand how different sorting algorithms work by providing step-by-step visual representations of the sorting process.

## Features

- **Interactive Visualizations**: Watch sorting algorithms execute step-by-step with animated bar charts
- **Multiple Algorithms**: Supports 6 popular sorting algorithms:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Heap Sort
- **Playback Controls**: Play, pause, step forward/backward, and reset functionality
- **Customizable Settings**: Adjust animation speed, array size, and display options
- **Algorithm Information**: Detailed descriptions, time complexity, and performance characteristics for each algorithm
- **Real-time Status**: Visual indicators showing which elements are being compared, swapped, or sorted

## How It Works

The application generates random arrays of numbers and visualizes them as animated bar charts. Each algorithm implementation tracks every step of the sorting process, including:

- **Comparing**: Elements being compared are highlighted
- **Swapping**: Elements being swapped are animated
- **Sorted**: Completed elements are marked as sorted
- **Pivot/Partition**: Special indicators for divide-and-conquer algorithms

The visualization shows the array state at each step, making it easy to understand how each algorithm progresses toward the final sorted result.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd algorithm-visualizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Available Scripts

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Usage

1. **Select an Algorithm**: Choose from the dropdown menu to visualize different sorting algorithms
2. **Generate New Array**: Click "Generate New Array" to create a new random dataset
3. **Control Playback**: Use the play/pause button to start/stop the visualization
4. **Step Through**: Use the forward/backward buttons to step through the algorithm manually
5. **Adjust Settings**: Modify speed, array size, and other visualization settings
6. **Learn**: Read the algorithm information panel to understand time complexity and how each algorithm works
