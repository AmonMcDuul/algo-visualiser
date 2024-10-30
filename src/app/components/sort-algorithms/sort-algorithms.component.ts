import { Component } from '@angular/core';
import { SortAlgorithmsService } from '../../services/sort-algorithms.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sort-algorithms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-algorithms.component.html',
  styleUrl: './sort-algorithms.component.scss'
})
export class SortAlgorithmsComponent {
  array: number[] = [];
  highlightedIndices: { [index: number]: string } = {};
  activeIndices: number[] = [];
  swapIndices: number[] = [];

  constructor(private sortAlgorithmsService: SortAlgorithmsService) {
    this.generateRandomArray();
  }

  generateRandomArray() {
    this.array = Array.from({ length: 30 }, () => Math.floor(Math.random() * 150) + 50);
    this.clearHighlights();
  }

  clearHighlights() {
    this.activeIndices = [];
    this.swapIndices = [];
    this.highlightedIndices = [];
  }

  async runBubbleSort() {
    this.generateRandomArray()
    await this.sortAlgorithmsService.bubbleSort(this.array, this.highlight.bind(this), this.swap.bind(this));
    this.clearHighlights();
  }

  async runInsertionSort() {
    this.generateRandomArray()
    await this.sortAlgorithmsService.insertionSort(this.array, this.highlight.bind(this), this.swap.bind(this));
    this.clearHighlights();
  }

  async runMergeSort() {
    this.generateRandomArray()
    await this.sortAlgorithmsService.mergeSort(this.array, this.highlight.bind(this), this.swap.bind(this));
    this.clearHighlights();
  }

  highlight(indices: number[]) {
    this.activeIndices = indices;
    this.highlightedIndices = { [indices[0]]: 'yellow', [indices[1]]: 'yellow' };
  }

  swap(indices: number[]) {
    this.swapIndices = indices;
  }

  visualizeSwap(index1: number, index2: number) {
    this.highlightedIndices = { [index1]: 'yellow', [index2]: 'yellow' };
  }
  
  getColor(index: number): string {
    return this.highlightedIndices[index] || '';
  }
}