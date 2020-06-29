import { TestBed } from '@angular/core/testing';

import { MediwebServiceService } from './mediweb-service.service';

describe('MediwebServiceService', () => {
  let service: MediwebServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediwebServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
