import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./view-icons/view-icons.module').then(m => m.ViewIconsModule)
  },
  {
    path: 'viewIcons/:dir',
    loadChildren: () => import('./view-icons/view-icons.module').then(m => m.ViewIconsModule)
  },
  {
    path: 'search/:searchStr',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
