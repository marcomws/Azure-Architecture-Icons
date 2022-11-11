import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewIconsRoutingModule } from './view-icons-routing.module';
import { ViewIconsComponent } from './view-icons.component';
import { IconsBlockModule } from '../icons-block/icons-block.module';


@NgModule({
  declarations: [
    ViewIconsComponent
  ],
  imports: [
    CommonModule,
    ViewIconsRoutingModule,
    IconsBlockModule
  ]
})
export class ViewIconsModule { }
