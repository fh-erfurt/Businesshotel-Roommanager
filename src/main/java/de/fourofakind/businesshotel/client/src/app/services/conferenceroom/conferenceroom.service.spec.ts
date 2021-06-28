import { TestBed } from '@angular/core/testing';

import { ConferenceroomService } from './conferenceroom.service';

describe('ConferenceroomService', () => {
  let service: ConferenceroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConferenceroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
