import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMoveEditorComponent } from './pokemon-move-editor.component';

describe('PokemonMoveEditorComponent', () => {
  let component: PokemonMoveEditorComponent;
  let fixture: ComponentFixture<PokemonMoveEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonMoveEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonMoveEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
