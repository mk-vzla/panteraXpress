import { TestBed } from '@angular/core/testing';

import { TerminalesService } from './terminales.service';

describe('TerminalesService', () => {
  let service: TerminalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
