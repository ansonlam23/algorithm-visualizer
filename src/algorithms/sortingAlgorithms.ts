import { ArrayElement, AlgorithmState } from '../types/algorithm';

export class SortingAlgorithms {
  static bubbleSort(array: number[]): AlgorithmState[] {
    const states: AlgorithmState[] = [];
    const elements: ArrayElement[] = array.map((value, index) => ({ value, index, status: 'default' }));
    
    states.push({
      array: [...elements],
      step: 0,
      totalSteps: 0,
      description: 'Starting bubble sort...',
      isComplete: false
    });

    let stepCount = 0;
    const n = elements.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Mark elements being compared
        const currentState = [...elements];
        currentState[j].status = 'comparing';
        currentState[j + 1].status = 'comparing';
        
        states.push({
          array: currentState.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Comparing elements at positions ${j} and ${j + 1}`,
          isComplete: false
        });

        if (currentState[j].value > currentState[j + 1].value) {
          // Start swapping animation - bars move towards each other
          currentState[j].status = 'swapping';
          currentState[j + 1].status = 'swapping';
          
          states.push({
            array: currentState.map(el => ({ ...el })),
            step: ++stepCount,
            totalSteps: 0,
            description: `Starting swap at positions ${j} and ${j + 1}`,
            isComplete: false
          });

          // Swap the values
          const temp = currentState[j].value;
          currentState[j].value = currentState[j + 1].value;
          currentState[j + 1].value = temp;
          
          // Keep swapping status for visual effect
          currentState[j].status = 'swapping';
          currentState[j + 1].status = 'swapping';
          
          states.push({
            array: currentState.map(el => ({ ...el })),
            step: ++stepCount,
            totalSteps: 0,
            description: `Swapped elements at positions ${j} and ${j + 1}`,
            isComplete: false
          });
        }

        // Reset status
        currentState[j].status = 'default';
        currentState[j + 1].status = 'default';
        elements[j] = currentState[j];
        elements[j + 1] = currentState[j + 1];
      }
      
      // Mark last element as sorted
      elements[n - i - 1].status = 'sorted';
    }

    // Mark first element as sorted
    elements[0].status = 'sorted';

    states.push({
      array: elements,
      step: ++stepCount,
      totalSteps: stepCount,
      description: 'Bubble sort completed!',
      isComplete: true
    });

    return states;
  }

  static selectionSort(array: number[]): AlgorithmState[] {
    const states: AlgorithmState[] = [];
    const elements: ArrayElement[] = array.map((value, index) => ({ value, index, status: 'default' }));
    
    states.push({
      array: [...elements],
      step: 0,
      totalSteps: 0,
      description: 'Starting selection sort...',
      isComplete: false
    });

    let stepCount = 0;
    const n = elements.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      
      // Mark current position
      elements[i].status = 'comparing';
      
      for (let j = i + 1; j < n; j++) {
        // Mark element being compared
        elements[j].status = 'comparing';
        
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Comparing element at position ${j} with current minimum`,
          isComplete: false
        });

        if (elements[j].value < elements[minIndex].value) {
          // Reset previous minimum
          if (minIndex !== i) {
            elements[minIndex].status = 'default';
          }
          minIndex = j;
          elements[j].status = 'comparing';
        } else {
          elements[j].status = 'default';
        }
      }

      // Swap if minimum is not at current position
      if (minIndex !== i) {
        const temp = elements[i].value;
        elements[i].value = elements[minIndex].value;
        elements[minIndex].value = temp;
        
        elements[i].status = 'swapping';
        elements[minIndex].status = 'swapping';
        
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Swapping minimum element to position ${i}`,
          isComplete: false
        });
      }

      // Mark as sorted
      elements[i].status = 'sorted';
      if (minIndex !== i) {
        elements[minIndex].status = 'default';
      }
    }

    // Mark last element as sorted
    elements[n - 1].status = 'sorted';

    states.push({
      array: elements,
      step: ++stepCount,
      totalSteps: stepCount,
      description: 'Selection sort completed!',
      isComplete: true
    });

    return states;
  }

  static insertionSort(array: number[]): AlgorithmState[] {
    const states: AlgorithmState[] = [];
    const elements: ArrayElement[] = array.map((value, index) => ({ value, index, status: 'default' }));
    
    states.push({
      array: [...elements],
      step: 0,
      totalSteps: 0,
      description: 'Starting insertion sort...',
      isComplete: false
    });

    let stepCount = 0;
    const n = elements.length;

    for (let i = 1; i < n; i++) {
      const key = elements[i].value;
      let j = i - 1;
      
      // Mark current element being inserted
      elements[i].status = 'comparing';
      
      states.push({
        array: elements.map(el => ({ ...el })),
        step: ++stepCount,
        totalSteps: 0,
        description: `Inserting element ${key} into sorted portion`,
        isComplete: false
      });

      while (j >= 0 && elements[j].value > key) {
        elements[j].status = 'comparing';
        
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Shifting element ${elements[j].value} to the right`,
          isComplete: false
        });

        elements[j + 1].value = elements[j].value;
        elements[j].status = 'swapping';
        elements[j + 1].status = 'swapping';
        
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Moved element to position ${j + 1}`,
          isComplete: false
        });

        j--;
      }

      elements[j + 1].value = key;
      elements[j + 1].status = 'sorted';
      
      // Reset all statuses
      elements.forEach((el, index) => {
        if (index <= i) {
          el.status = 'sorted';
        } else {
          el.status = 'default';
        }
      });

      states.push({
        array: elements.map(el => ({ ...el })),
        step: ++stepCount,
        totalSteps: 0,
        description: `Placed ${key} in correct position`,
        isComplete: false
      });
    }

    states.push({
      array: elements,
      step: ++stepCount,
      totalSteps: stepCount,
      description: 'Insertion sort completed!',
      isComplete: true
    });

    return states;
  }

  static mergeSort(array: number[]): AlgorithmState[] {
    const states: AlgorithmState[] = [];
    const elements: ArrayElement[] = array.map((value, index) => ({ value, index, status: 'default' }));
    
    states.push({
      array: [...elements],
      step: 0,
      totalSteps: 0,
      description: 'Starting merge sort...',
      isComplete: false
    });

    let stepCount = 0;
    
    const merge = (left: number, mid: number, right: number) => {
      const leftArray = elements.slice(left, mid + 1).map(el => el.value);
      const rightArray = elements.slice(mid + 1, right + 1).map(el => el.value);
      
      let i = 0, j = 0, k = left;
      
      while (i < leftArray.length && j < rightArray.length) {
        // Mark elements being compared
        elements[k].status = 'comparing';
        
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Comparing ${leftArray[i]} and ${rightArray[j]}`,
          isComplete: false
        });

        if (leftArray[i] <= rightArray[j]) {
          elements[k].value = leftArray[i];
          elements[k].status = 'swapping';
          i++;
        } else {
          elements[k].value = rightArray[j];
          elements[k].status = 'swapping';
          j++;
        }
        
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Placed element in position ${k}`,
          isComplete: false
        });
        
        k++;
      }
      
      while (i < leftArray.length) {
        elements[k].value = leftArray[i];
        elements[k].status = 'swapping';
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Placed remaining element from left array`,
          isComplete: false
        });
        i++;
        k++;
      }
      
      while (j < rightArray.length) {
        elements[k].value = rightArray[j];
        elements[k].status = 'swapping';
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Placed remaining element from right array`,
          isComplete: false
        });
        j++;
        k++;
      }
      
      // Mark merged section as sorted
      for (let m = left; m <= right; m++) {
        elements[m].status = 'sorted';
      }
    };
    
    const mergeSortHelper = (left: number, right: number) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSortHelper(left, mid);
        mergeSortHelper(mid + 1, right);
        merge(left, mid, right);
      }
    };
    
    mergeSortHelper(0, elements.length - 1);
    
    states.push({
      array: elements,
      step: ++stepCount,
      totalSteps: stepCount,
      description: 'Merge sort completed!',
      isComplete: true
    });

    return states;
  }

  static quickSort(array: number[]): AlgorithmState[] {
    const states: AlgorithmState[] = [];
    const elements: ArrayElement[] = array.map((value, index) => ({ value, index, status: 'default' }));
    
    states.push({
      array: [...elements],
      step: 0,
      totalSteps: 0,
      description: 'Starting quick sort...',
      isComplete: false
    });

    let stepCount = 0;
    
    const partition = (low: number, high: number): number => {
      const pivot = elements[high].value;
      elements[high].status = 'pivot';
      
      states.push({
        array: elements.map(el => ({ ...el })),
        step: ++stepCount,
        totalSteps: 0,
        description: `Pivot element: ${pivot}`,
        isComplete: false
      });
      
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        elements[j].status = 'comparing';
        
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Comparing ${elements[j].value} with pivot ${pivot}`,
          isComplete: false
        });
        
        if (elements[j].value < pivot) {
          i++;
          if (i !== j) {
            const temp = elements[i].value;
            elements[i].value = elements[j].value;
            elements[j].value = temp;
            
            elements[i].status = 'swapping';
            elements[j].status = 'swapping';
            
            states.push({
              array: elements.map(el => ({ ...el })),
              step: ++stepCount,
              totalSteps: 0,
              description: `Swapped elements at positions ${i} and ${j}`,
              isComplete: false
            });
          }
        }
        
        elements[j].status = 'default';
      }
      
      const temp = elements[i + 1].value;
      elements[i + 1].value = elements[high].value;
      elements[high].value = temp;
      
      elements[i + 1].status = 'swapping';
      elements[high].status = 'swapping';
      
      states.push({
        array: elements.map(el => ({ ...el })),
        step: ++stepCount,
        totalSteps: 0,
        description: `Placed pivot in final position`,
        isComplete: false
      });
      
      elements[i + 1].status = 'sorted';
      elements[high].status = 'default';
      
      return i + 1;
    };
    
    const quickSortHelper = (low: number, high: number) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    };
    
    quickSortHelper(0, elements.length - 1);
    
    // Mark all elements as sorted
    elements.forEach(el => el.status = 'sorted');
    
    states.push({
      array: elements,
      step: ++stepCount,
      totalSteps: stepCount,
      description: 'Quick sort completed!',
      isComplete: true
    });

    return states;
  }

  static heapSort(array: number[]): AlgorithmState[] {
    const states: AlgorithmState[] = [];
    const elements: ArrayElement[] = array.map((value, index) => ({ value, index, status: 'default' }));
    
    states.push({
      array: [...elements],
      step: 0,
      totalSteps: 0,
      description: 'Starting heap sort...',
      isComplete: false
    });

    let stepCount = 0;
    
    const heapify = (n: number, i: number) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      
      if (left < n) {
        elements[left].status = 'comparing';
        elements[largest].status = 'comparing';
        
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Comparing with left child`,
          isComplete: false
        });
        
        if (elements[left].value > elements[largest].value) {
          largest = left;
        }
        elements[left].status = 'default';
        elements[largest].status = 'default';
      }
      
      if (right < n) {
        elements[right].status = 'comparing';
        elements[largest].status = 'comparing';
        
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Comparing with right child`,
          isComplete: false
        });
        
        if (elements[right].value > elements[largest].value) {
          largest = right;
        }
        elements[right].status = 'default';
        elements[largest].status = 'default';
      }
      
      if (largest !== i) {
        const temp = elements[i].value;
        elements[i].value = elements[largest].value;
        elements[largest].value = temp;
        
        elements[i].status = 'swapping';
        elements[largest].status = 'swapping';
        
        states.push({
          array: elements.map(el => ({ ...el })),
          step: ++stepCount,
          totalSteps: 0,
          description: `Swapped with larger child`,
          isComplete: false
        });
        
        heapify(n, largest);
      }
    };
    
    // Build max heap
    for (let i = Math.floor(elements.length / 2) - 1; i >= 0; i--) {
      heapify(elements.length, i);
    }
    
    // Extract elements from heap one by one
    for (let i = elements.length - 1; i > 0; i--) {
      const temp = elements[0].value;
      elements[0].value = elements[i].value;
      elements[i].value = temp;
      
      elements[0].status = 'swapping';
      elements[i].status = 'swapping';
      
      states.push({
        array: elements.map(el => ({ ...el })),
        step: ++stepCount,
        totalSteps: 0,
        description: `Moved largest element to position ${i}`,
        isComplete: false
      });
      
      elements[i].status = 'sorted';
      
      heapify(i, 0);
    }
    
    elements[0].status = 'sorted';
    
    states.push({
      array: elements,
      step: ++stepCount,
      totalSteps: stepCount,
      description: 'Heap sort completed!',
      isComplete: true
    });

    return states;
  }

  static generateRandomArray(size: number, min: number = 1, max: number = 100): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  }
} 