import { PokemonService } from './../../models/services/pokemon.service';
import { AuthGuard } from './../../shared/guards/auth.guard';
import { Pokemon } from './../../models/classes/pokemon';
import { Shared } from './../../shared/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginPageRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [LoginComponent],
  providers: [
    Shared,
    Pokemon,
    PokemonService,
    FormBuilder,
    AuthGuard
  ],
})
export class LoginPageModule {}
