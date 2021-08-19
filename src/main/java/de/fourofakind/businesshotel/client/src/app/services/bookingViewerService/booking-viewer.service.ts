import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {ViewerFriendlyBooking} from "../booking/booking";
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';
import {BookingService} from "../booking/booking.service";

interface SearchResult {
  bookings: ViewerFriendlyBooking[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

@Injectable({
  providedIn: 'root'
})

/**
 * Service for bookingViewer (sort, compare, match) hotelRoomBookings and conferenceRoomBookings
 */

export class BookingViewerService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _bookings$ = new BehaviorSubject<ViewerFriendlyBooking[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public bookings: ViewerFriendlyBooking[] = []

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe)
  {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._bookings$.next(result.bookings);
      this._total$.next(result.total);
    });

    this._search$.next();

  }

  get bookings$() { return this._bookings$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  /**
   * searches for Booking
   */

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    let bookings = sort(this.bookings, sortColumn, sortDirection);

    bookings = bookings.filter(booking => matches(booking, searchTerm, this.pipe));
    const total = bookings.length;

    bookings = bookings.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({bookings, total});
  }
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

/**
 * sorts Booking by selected column
 *
 * @param bookings to sort bookingData
 * @param column selected column
 * @param direction reverse or normal
 */
function sort(bookings: ViewerFriendlyBooking[], column: SortColumn, direction: string): ViewerFriendlyBooking[] {
  if (direction === '' || column === '') {
    return bookings;
  } else {
    return [...bookings].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

/**
 * matches Booking by selected column
 *
 * @param booking to sort bookingData
 * @param term
 * @param pipe
 */

function matches(booking: ViewerFriendlyBooking, term: string, pipe: PipeTransform) {
  return booking.specialWishes.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(booking.bookingNo).includes(term)
    || pipe.transform(booking.pricing).includes(term)
    || booking.startDate.toLowerCase().includes(term.toLowerCase())
    || booking.endDate.toLowerCase().includes(term.toLowerCase());
}
