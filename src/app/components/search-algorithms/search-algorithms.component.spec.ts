import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAlgorithmsComponent } from './search-algorithms.component';

describe('SearchAlgorithmsComponent', () => {
  let component: SearchAlgorithmsComponent;
  let fixture: ComponentFixture<SearchAlgorithmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAlgorithmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAlgorithmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
