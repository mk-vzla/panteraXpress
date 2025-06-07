import { TestBed } from '@angular/core/testing';

import { BusRutasService } from './bus-rutas.service';

describe('BusRutasService', () => {
  let service: BusRutasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusRutasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
