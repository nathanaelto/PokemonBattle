import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatsDisplayComponent } from './pokemon-stats-display.component';

describe('PokemonStatsDisplayComponent', () => {
  let component: PokemonStatsDisplayComponent;
  let fixture: ComponentFixture<PokemonStatsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonStatsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonStatsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
