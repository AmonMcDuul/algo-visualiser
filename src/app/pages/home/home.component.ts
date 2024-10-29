import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SortAlgorithmsComponent } from "../../components/sort-algorithms/sort-algorithms.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, SortAlgorithmsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  activeScreen: string = 'Algemeen';

  onScreenChange(screen: string) {
    this.activeScreen = screen;
  }
}