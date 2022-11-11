import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ViewIconsService } from './view-icons/view-icons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'tsTest';

  dirNames: string[] = [];
  selectedDir: string = "";
  search: string = "";
  isSearch: boolean = false;
  PDFsOpened = false;

  private ngOnDestroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  constructor(
    private router: Router,
    private _viewIconsService: ViewIconsService) {
    _viewIconsService.getDirNames()
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(dn => this.dirNames = dn);

    this.PDFsOpened = localStorage.getItem('Azure_Icons_FAQ.pdf') == "true" &&
      localStorage.getItem('Microsoft_Terms_of_Use.pdf') == "true" &&
      localStorage.getItem('CELA_Licenses_Public_Use_Icons.pdf') == "true" &&
      localStorage.getItem('Dynamics 365_Icons_FAQ.pdf') == "true" &&
      localStorage.getItem('Power_Platform_Icons_FAQ.pdf') == "true";
  }

  selected(dir: string): string {
    this.isSearch = false;
    return this.selectedDir = ' / ' + dir;
  }

  onSearch(): void {
    this.isSearch = true;
    this.search?.length > 1 ? this.router.navigateByUrl(`/search/${this.search}`) : null;
  }

  openPDF = (url: string) => {
    localStorage.setItem(url, "true");
    return window.open(`assets/azure-icons/${url}`, '_blank');
  };

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
    this.ngOnDestroy$.complete();
  }
}
