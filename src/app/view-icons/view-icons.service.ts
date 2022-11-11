import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GROUP_BY, ISearch } from '../common/helpers';
import { IconsDTO, RawIcons } from '../common/interfaces';
import { TrimIcoNamePipe } from '../common/trim-ico-name.pipe';
import data from '../../assets/azure-icons/azure-icons.json';

@Injectable({
  providedIn: 'root'
})
export class ViewIconsService {

  private _icons$: BehaviorSubject<IconsDTO> = new BehaviorSubject<IconsDTO>({} as IconsDTO);
  private allIcons: IconsDTO[] = [];

  constructor(private _trimIcoNamePipe: TrimIcoNamePipe) {
    this.allIcons = this.dirs();
  }

  updateIcons(dirName: string): Observable<IconsDTO> {
    const dir = this.allIcons.find(d => d.dirName === dirName);
    this._icons$.next(dir as IconsDTO)
    return this.getIcons();
  }

  searchIcon(searchStr: string): Observable<IconsDTO[]> {
    let searchIcons: IconsDTO[] = this.dirs();

    searchIcons = searchIcons?.filter(icoG => {
      icoG.icons = icoG.icons.filter(ico => ISearch(this._trimIcoNamePipe.transform(ico), searchStr));
      return icoG.icons.length > 0;
    });

    const searchIcons$: BehaviorSubject<IconsDTO[]> = new BehaviorSubject<IconsDTO[]>(searchIcons);
    return searchIcons$.asObservable();
  }

  getIcons(): Observable<IconsDTO> {
    return this._icons$.asObservable();
  }

  getDirNames(): Observable<string[]> {
    const dirNames = this.allIcons.map(d => d.dirName);
    const dirNames$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(dirNames);
    return dirNames$.asObservable();
  }

  private dirs(): IconsDTO[] {
    return GROUP_BY<RawIcons>(data.icons, {
      groupField: "DirectoryName",
      groupingName: "dirName",
      subListName: "icons",
      subListMap: (icon) => icon.Name
    });
  }
}
