import { TestBed } from '@angular/core/testing';

import { BaseTermService } from './base-term.service';

describe('BaseTermService', () => {
  let service: BaseTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
