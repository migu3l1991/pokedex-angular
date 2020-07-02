import { Injectable } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Observable } from 'rxjs';
import { IPokemonData, ISpecie, IChainEvolution, IPokemonList } from '../interfaces/pokemon.interface';

@Injectable()
export class Pokemon {

  constructor(private pokemonService: PokemonService) { }

  getPokemonInfoByNameOrId(nameOrId: string): Observable<IPokemonData> {
    return this.pokemonService.getPokemonInfoByNameOrId(nameOrId);
  }

  getPokemons(offset: string, limit: string): Observable<IPokemonList> {
    return this.pokemonService.getPokemons(offset, limit);
  }

  getChainEvolutionById(id: string): Observable<IChainEvolution> {
    return this.pokemonService.getChainEvolutionById(id);
  }

  getSpeciesByNameOrId(nameOrId: string): Observable<ISpecie> {
    return this.pokemonService.getSpeciesByNameOrId(nameOrId);
  }
}
