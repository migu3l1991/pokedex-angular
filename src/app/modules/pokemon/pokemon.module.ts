import { ScrollDownDirective } from './../../shared/directives/scroll-down.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonMainComponent } from './components/pokemon-main/pokemon-main.component';

import { PokemonPageRoutingModule } from './pokemon-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PokemonPageRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    PokemonDetailComponent,
    PokemonListComponent,
    PokemonCardComponent,
    PokemonMainComponent,
    ScrollDownDirective,
  ],
})
export class PokemonPageModule {}
