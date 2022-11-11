import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsBlockComponent } from './icons-block.component';
import { TrimIcoNamePipeModule } from '../common/trim-ico-name.pipe';



@NgModule({
  declarations: [
    IconsBlockComponent
  ],
  imports: [
    CommonModule,
    TrimIcoNamePipeModule
  ],
  exports: [
    IconsBlockComponent
  ]
})
export class IconsBlockModule { }
