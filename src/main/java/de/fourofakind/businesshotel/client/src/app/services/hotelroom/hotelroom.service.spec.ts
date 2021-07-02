import { TestBed } from '@angular/core/testing';

import { HotelroomService } from './hotelroom.service';

describe('HotelroomService', () => {
  let service: HotelroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
