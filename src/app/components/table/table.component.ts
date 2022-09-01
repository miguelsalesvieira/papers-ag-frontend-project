import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input('columns')
  columns: string[] = [];

  @Input('items')
  items: any[] = [];

  @Input('currentPage')
  page: number = 0;

  @Input('totalPages')
  total: number = 0;

  @Input('itemsPerPage')
  perPage: number = 0;

  @Output('onClickNext')
  incrementPage: EventEmitter<null> = new EventEmitter<null>();

  @Output('onClickPrevious')
  decrementPage: EventEmitter<null> = new EventEmitter<null>();

  @Output('onClickNextN')
  incrementPageN: EventEmitter<null> = new EventEmitter<null>();

  @Output('onClickPreviousN')
  decrementPageN: EventEmitter<null> = new EventEmitter<null>();

  @Output('onClickPageN')
  gotoPageN: EventEmitter<number> = new EventEmitter<number>();

  @Output('onClickItem')
  clickItem: EventEmitter<number> = new EventEmitter<number>();

  @Output('onClickNumberPerPage')
  clickNumberPerPage: EventEmitter<number> = new EventEmitter<number>();

  openPagination: boolean = false;

  constructor() {}

  range(start: number, stop?: number, step?: number) {
    if (typeof stop == 'undefined') {
      // one param defined
      stop = start;
      start = 0;
    }

    if (typeof step == 'undefined') {
      step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
      return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }

    return result;
  }

  open() {
    this.openPagination = !this.openPagination;
  }

  onClickNumberPerPage(value: number) {
    this.openPagination = false;
    this.clickNumberPerPage.emit(value);
  }
}
