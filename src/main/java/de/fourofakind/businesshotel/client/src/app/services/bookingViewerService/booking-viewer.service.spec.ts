import { TestBed } from '@angular/core/testing';

import { BookingViewerService } from './booking-viewer.service';

describe('BookingViewerService', () => {
  let service: BookingViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
