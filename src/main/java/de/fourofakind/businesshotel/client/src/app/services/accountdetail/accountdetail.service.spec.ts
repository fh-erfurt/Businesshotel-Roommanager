import { TestBed } from '@angular/core/testing';

import { AccountdetailService } from './accountdetail.service';

describe('AccountdetailService', () => {
  let service: AccountdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
