import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { LoginPageRoutingModule } from './login-routing.module';
import { Shared } from 'src/app/shared/shared';
import { Pokemon } from 'src/app/models/classes/pokemon';
import { PokemonService } from 'src/app/models/services/pokemon.service';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

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
