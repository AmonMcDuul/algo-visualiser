import { Component } from '@angular/core';
import { SearchAlgorithmsService } from '../../services/search-algorithms.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-algorithms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-algorithms.component.html',
  styleUrl: './search-algorithms.component.scss'
})
export class SearchAlgorithmsComponent {
  array: number[] = [];
  activeIndex: number | null = null;
  foundIndex: number | null = null;
  targetValue: number = 120; 
  highlightedIndices: { [index: number]: string } = {};

  constructor(private searchService: SearchAlgorithmsService) {
    this.generateArray();
  }

  generateArray() {
    this.array = Array.from({ length: 30 }, (_, i) => i * 8);
    this.clearHighlights();
  }

  shuffleArray(): number[] {
    for (let i = this.array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    }
    return this.array;
  }

  clearHighlights() {
    this.activeIndex = null;
    this.foundIndex = null;
  }

  async runLinearSearch() {
    this.foundIndex = await this.searchService.linearSearch(this.array, this.targetValue, this.highlight.bind(this));
  }

  async runBinarySearch() {
    this.array.sort((a, b) => a - b); 
    this.foundIndex = await this.searchService.binarySearch(this.array, this.targetValue, this.highlight.bind(this));
  }

  highlight(index: number) {
    this.activeIndex = index;
    this.highlightedIndices = { [index]: 'yellow' };
  }

  getColor(index: number): string {
    return this.highlightedIndices[index] || 'lightgray';
  }
}