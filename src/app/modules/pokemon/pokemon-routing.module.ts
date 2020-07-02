import { PokemonMainComponent } from './components/pokemon-main/pokemon-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  {
    path: '',
    component: PokemonMainComponent,
    children: [
      {
        path: '',
        component: PokemonListComponent,
      },
      {
        path: 'detail/:id',
        component: PokemonDetailComponent,
      },
      {
        path: 'list',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'list',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonPageRoutingModule {}
