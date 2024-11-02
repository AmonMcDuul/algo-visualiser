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

  async jumpSearch(array: number[], target: number, highlight: (index: number) => void): Promise<number | null> {
    const n = array.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;

    while (array[Math.min(step, n) - 1] < target) {
      highlight(Math.min(step, n) - 1);
      prev = step;
      step += Math.floor(Math.sqrt(n));
      if (prev >= n) return null;
      await this.delay(100);
    }

    for (let i = prev; i < Math.min(step, n); i++) {
      highlight(i);
      if (array[i] === target) {
        return i;
      }
      await this.delay(100);
    }
    return null;
  }

  async exponentialSearch(array: number[], target: number, highlight: (index: number) => void): Promise<number | null> {
    if (array[0] === target) {
      highlight(0);
      return 0;
    }

    let range = 1;
    while (range < array.length && array[range] < target) {
      highlight(range);
      range *= 2;
      await this.delay(100);
    }

    return this.binarySearchWithin(array, target, Math.floor(range / 2), Math.min(range, array.length - 1), highlight);
  }

  private async binarySearchWithin(array: number[], target: number, left: number, right: number, highlight: (index: number) => void): Promise<number | null> {
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

  async interpolationSearch(array: number[], target: number, highlight: (index: number) => void): Promise<number | null> {
    let left = 0;
    let right = array.length - 1;

    while (left <= right && target >= array[left] && target <= array[right]) {
      if (left === right) {
        if (array[left] === target) {
          highlight(left);
          return left;
        }
        return null;
      }

      const pos = left + Math.floor(((target - array[left]) * (right - left)) / (array[right] - array[left]));
      highlight(pos);

      if (array[pos] === target) {
        return pos;
      } else if (array[pos] < target) {
        left = pos + 1;
      } else {
        right = pos - 1;
      }
      await this.delay(100);
    }
    return null;
  }
}
