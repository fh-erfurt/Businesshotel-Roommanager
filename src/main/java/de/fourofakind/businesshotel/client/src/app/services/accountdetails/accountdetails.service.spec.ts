import { TestBed } from '@angular/core/testing';

import { AccountdetailsService } from './accountdetails.service';

describe('AccountdetailsService', () => {
  let service: AccountdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
