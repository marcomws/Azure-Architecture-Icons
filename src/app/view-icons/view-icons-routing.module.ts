import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewIconsComponent } from './view-icons.component';
import { ViewIconsResolver } from './view-icons.resolver';

const routes: Routes = [
  {
    path: '',
    component: ViewIconsComponent,
    resolve: {
      data: ViewIconsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewIconsRoutingModule { }
