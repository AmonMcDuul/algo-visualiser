import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchAlgorithmsService {
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async linearSearch(array: number[], target: number, highlight: (index: number) => void): Promise<number | null> {
    for (let i = 0; i < array.length; i++) {
      highlight(i);
      if (array[i] === target) {
        return i;
      }
      await this.delay(100);
    }
    return null;
  }

  async binarySearch(array: number[], target: number, highlight: (index: number) => void): Promise<number | null> {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      highlight(mid);
      if (array[mid] === target) {
        return mid;
      } else if (array[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
      await this.delay(100);
    }
    return null;
  }
}
