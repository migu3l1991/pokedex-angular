import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'account',
    loadChildren: () => import('../account/account.module').then((m) => m.AccountPageModule)
  },
  {
    path: 'pokemon-list',
    loadChildren: () => import('./../pokemon/pokemon.module').then((m) => m.PokemonPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule {}
