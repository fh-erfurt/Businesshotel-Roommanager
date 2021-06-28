import { TestBed } from '@angular/core/testing';

import { BookingrequestService } from './bookingrequest.service';

describe('BookingrequestService', () => {
  let service: BookingrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
