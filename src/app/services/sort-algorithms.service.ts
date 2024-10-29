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
          swap([j, j + 1]);
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
        swap([j, j - 1]);
        j--;
        await this.delay(30);
      }
    }
  }
}
