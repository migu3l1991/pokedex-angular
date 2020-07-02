import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPokemonData, ISpecie, IChainEvolution, IPokemonList } from '../interfaces/pokemon.interface';

@Injectable()
export class PokemonService {
  private baseUrlPokemonInfo = 'https://pokeapi.co/api/v2/pokemon/';
  private baseUrlChainEvolutionInfo = 'https://pokeapi.co/api/v2/evolution-chain/';
  private baseUrlSpeciesInfo = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor(private http: HttpClient) {}

  getPokemonInfoByNameOrId(nameOrId: string): Observable<IPokemonData> {
    return this.http.get<IPokemonData>(`${this.baseUrlPokemonInfo}${nameOrId}`);
  }

  getPokemons(offset: string, limit: string): Observable<IPokemonList> {
    const params = new HttpParams({
      fromObject: {
        offset,
        limit
      }
    });
    return this.http.get<IPokemonList>(`${this.baseUrlPokemonInfo}`, { params });
  }

  getChainEvolutionById(id: string): Observable<IChainEvolution> {
    return this.http.get<IChainEvolution>(`${this.baseUrlChainEvolutionInfo}${id}`);
  }

  getSpeciesByNameOrId(nameOrId: string): Observable<ISpecie> {
    return this.http.get<ISpecie>(`${this.baseUrlSpeciesInfo}${nameOrId}`);
  }
}
