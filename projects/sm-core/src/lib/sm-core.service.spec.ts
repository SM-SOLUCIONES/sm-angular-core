import { TestBed } from '@angular/core/testing';

import { SmCoreService } from './sm-core.service';

describe('SmCoreService', () => {
  let service: SmCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
