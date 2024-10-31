import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortAlgorithmsService {
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async bubbleSort(array: number[], highlight: (indices: number[]) => void, swap: (indices: number[]) => void) {
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        highlight([j, j + 1]);
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swap([j]);
        }
        await this.delay(30);
      }
    }
  }

  async insertionSort(array: number[], highlight: (indices: number[]) => void, swap: (indices: number[]) => void) {
    for (let i = 1; i < array.length; i++) {
      let j = i;
      while (j > 0 && array[j - 1] > array[j]) {
        highlight([j, j - 1]);
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
        swap([j]);
        j--;
        await this.delay(30);
      }
    }
  }

  async mergeSort(arr: number[], highlight: (indices: number[]) => void, swap: (indices: number[]) => void): Promise<void> {
    const merge = async (arr: number[], left: number, middle: number, right: number) => {
      let leftArray = arr.slice(left, middle + 1);
      let rightArray = arr.slice(middle + 1, right + 1);
      let i = 0, j = 0, k = left;

      while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
          arr[k] = leftArray[i++];
          // swap([k]);

        } else {
          arr[k] = rightArray[j++];
          // swap([k]);
        }
        await this.delay(30);
        swap([k])
        k++;
      }

      while (i < leftArray.length) {
        arr[k] = leftArray[i++];
        await this.delay(30);
        k++;
      }

      while (j < rightArray.length) {
        arr[k] = rightArray[j++];
        await this.delay(30);
        k++;
      }
    };

    const mergeSortRecursive = async (arr: number[], left: number, right: number) => {
      if (left >= right) return;
      const middle = Math.floor((left + right) / 2);
      await mergeSortRecursive(arr, left, middle);
      highlight([left, middle]);
      await mergeSortRecursive(arr, middle + 1, right);
      highlight([middle+1, right]);
      await merge(arr, left, middle, right);
    };

    await mergeSortRecursive(arr, 0, arr.length - 1);
  }

  // Quick Sort
  async quickSort(arr: number[], left = 0, right = arr.length - 1, highlight: (indices: number[]) => void, swap: (indices: number[]) => void) {
    highlight([left, right]);
    if (left < right) {
      const pivotIndex = await this.partition(arr, left, right);
      swap([pivotIndex]);
      await this.quickSort(arr, left, pivotIndex - 1, highlight, swap);
      await this.quickSort(arr, pivotIndex + 1, right, highlight, swap);
    }
  }

  private async partition(arr: number[], left: number, right: number): Promise<number> {
    const pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      await this.delay(30);
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
  }

  // Selection Sort
  async selectionSort(arr: number[], highlight: (indices: number[]) => void, swap: (indices: number[]) => void) {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      swap([minIndex])
      for (let j = i + 1; j < arr.length; j++) {
        swap([j])
        if (arr[j] < arr[minIndex]) minIndex = j;
        await this.delay(30);
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        highlight([i]);
        await this.delay(30);
      }
    }
  }

  // Heap Sort
  async heapSort(arr: number[]) {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      await this.heapify(arr, arr.length, i);
    }
    for (let i = arr.length - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      await this.delay(100);
      await this.heapify(arr, i, 0);
    }
  }

  private async heapify(arr: number[], n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      await this.delay(30);
      await this.heapify(arr, n, largest);
    }
  }

  // Counting Sort
  async countingSort(arr: number[]) {
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);
    const output = new Array(arr.length);

    arr.forEach((value) => count[value]++);

    for (let i = 1; i < count.length; i++) count[i] += count[i - 1];

    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      await this.delay(30);
    }
  }

  // Radix Sort
  async radixSort(arr: number[]) {
    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await this.countingSortByDigit(arr, exp);
    }
  }

  private async countingSortByDigit(arr: number[], exp: number) {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
      const index = Math.floor(arr[i] / exp) % 10;
      count[index]++;
    }

    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    for (let i = arr.length - 1; i >= 0; i--) {
      const index = Math.floor(arr[i] / exp) % 10;
      output[count[index] - 1] = arr[i];
      count[index]--;
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      await this.delay(30);
    }
  }

  // Shell Sort
  async shellSort(arr: number[]) {
    for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < arr.length; i++) {
        const temp = arr[i];
        let j;

        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          arr[j] = arr[j - gap];
          await this.delay(30);
        }

        arr[j] = temp;
        await this.delay(30);
      }
    }
  }
}
