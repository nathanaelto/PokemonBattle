import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMoveDisplayComponent } from './pokemon-move-display.component';

describe('PokemonMoveDisplayComponent', () => {
  let component: PokemonMoveDisplayComponent;
  let fixture: ComponentFixture<PokemonMoveDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonMoveDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonMoveDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
