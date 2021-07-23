import { TestBed } from '@angular/core/testing';

import { Pokemon.ApiService } from './pokemon.api.service';

describe('Pokemon.ApiService', () => {
  let service: Pokemon.ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pokemon.ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
