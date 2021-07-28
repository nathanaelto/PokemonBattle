import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatsEditorComponent } from './pokemon-stats-editor.component';

describe('PokemonStatsEditorComponent', () => {
  let component: PokemonStatsEditorComponent;
  let fixture: ComponentFixture<PokemonStatsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonStatsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonStatsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
