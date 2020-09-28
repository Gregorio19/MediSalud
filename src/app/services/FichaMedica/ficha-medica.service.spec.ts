import { TestBed } from '@angular/core/testing';

import { FichaMedicaService } from './ficha-medica.service';

describe('FichaMedicaService', () => {
  let service: FichaMedicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichaMedicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
