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
}
