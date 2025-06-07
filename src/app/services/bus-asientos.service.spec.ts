import { TestBed } from '@angular/core/testing';

import { AsientosBusService } from './bus-asientos.service';

describe('BusAsientosService', () => {
  let service: AsientosBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsientosBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
