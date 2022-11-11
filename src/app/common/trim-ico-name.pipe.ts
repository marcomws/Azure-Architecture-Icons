import { Pipe, PipeTransform } from '@angular/core';
import { NgModule } from '@angular/core';

@Pipe({ name: 'trimIcoName' })
export class TrimIcoNamePipe implements PipeTransform {
  transform(value: string): string {
    let shortName = value.replace('_scalable', '');
    shortName = shortName.replace(/(.*?)(icon-service-)(.*?).svg/gm, "$3");
    shortName = shortName.replace(' .svg', '');
    shortName = shortName.replace('.svg', '');
    return shortName.replace(/[- _]/g, ' ');
  }
}

@NgModule({
  declarations: [
    TrimIcoNamePipe
  ],
  exports: [
    TrimIcoNamePipe
  ]
})
export class TrimIcoNamePipeModule { }
