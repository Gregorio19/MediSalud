import { TestBed } from '@angular/core/testing';

import { MapaserviceService } from './mapaservice.service';

describe('MapaserviceService', () => {
  let service: MapaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
