import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectScreenComponent } from './select-screen.component';

describe('SelectScreenComponent', () => {
  let component: SelectScreenComponent;
  let fixture: ComponentFixture<SelectScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
