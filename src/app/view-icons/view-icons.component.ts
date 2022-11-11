import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { IconsDTO } from '../common/interfaces';

@Component({
  selector: 'app-view-icons',
  templateUrl: './view-icons.component.html',
  styleUrls: ['./view-icons.component.scss']
})
export class ViewIconsComponent implements OnInit, OnDestroy {

  icons: IconsDTO = {} as IconsDTO;
  iconsPH = [...Array(20)];

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
