import { Shared } from './../../../../shared/shared';
import { IPokemonData } from './../../../../models/interfaces/pokemon.interface';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: IPokemonData;

  constructor(
    private _shared: Shared,
    private _router: Router
  ) {}

  ngOnInit() {}

  pokemonDetail() {
    this._shared.setPokemonData(this.pokemon);
    this._shared.setStatusHomeActionHeader(true);
    this._router.navigate([`home/pokemon-list/detail/${this.pokemon.id}`]);
  }
}
