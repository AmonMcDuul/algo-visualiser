import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortAlgorithmsComponent } from './sort-algorithms.component';

describe('SortAlgorithmsComponent', () => {
  let component: SortAlgorithmsComponent;
  let fixture: ComponentFixture<SortAlgorithmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortAlgorithmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortAlgorithmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
