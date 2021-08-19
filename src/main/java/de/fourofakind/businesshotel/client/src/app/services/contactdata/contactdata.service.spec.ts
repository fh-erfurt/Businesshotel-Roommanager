import { TestBed } from '@angular/core/testing';

import { ContactdataService } from './contactdata.service';

describe('ContactdataService', () => {
  let service: ContactdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
