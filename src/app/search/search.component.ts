import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { IconsDTO } from '../common/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  icons: IconsDTO[] = [];

  private ngOnDestroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
    .pipe(takeUntil(this.ngOnDestroy$))
    .subscribe(icons => this.icons = icons['data']);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
    this.ngOnDestroy$.complete();
  }
}
