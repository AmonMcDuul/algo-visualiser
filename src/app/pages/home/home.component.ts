import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SortAlgorithmsComponent } from "../../components/sort-algorithms/sort-algorithms.component";
import { SearchAlgorithmsComponent } from "../../components/search-algorithms/search-algorithms.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, SortAlgorithmsComponent, SearchAlgorithmsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  activeScreen: string = 'sort';

  onScreenChange(screen: string) {
    this.activeScreen = screen;
  }
}