import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IconsDTO } from '../common/interfaces';
import { ViewIconsService } from './view-icons.service';

@Injectable({
  providedIn: 'root'
})
export class ViewIconsResolver implements Resolve<IconsDTO> {

  constructor(private _viewIconsService: ViewIconsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IconsDTO> {
    const dirName = route.paramMap.get("dir");
    return this._viewIconsService.updateIcons(dirName as string);
  }
}
