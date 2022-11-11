import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IconsDTO } from '../common/interfaces';
import { ViewIconsService } from '../view-icons/view-icons.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResolver implements Resolve<IconsDTO[]> {

  constructor(private _viewIconsService: ViewIconsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IconsDTO[]> {
    const searchStr = route.paramMap.get("searchStr");
    return this._viewIconsService.searchIcon(searchStr as string);
  }
}
