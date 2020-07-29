import { Shared } from './../../../../shared/shared';
import { Pokemon } from './../../../../models/classes/pokemon';
import { IPokemonData, IPokemonList, IPokemonUrlData } from './../../../../models/interfaces/pokemon.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin, of, Subscription } from 'rxjs';
import { expand, delay, filter, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemonList: IPokemonData[] = [];
  offset = 0;
  limit = 50;
  isSearchingByFilter = false;
  filterValue = '';
  hasMorePokemons = true;
  isLoading = false;
  searchPokemonSubscription: Subscription[] = [];

  constructor(private _pokemonService: Pokemon, private _shared: Shared) { }

  ngOnInit() {
    this._shared.setStatusHomeActionHeader(false);
    this.getPokemons();
    this.subscriptionSearchPokemon();
  }

  ngOnDestroy(): void {
    if (this.searchPokemonSubscription && this.searchPokemonSubscription.length) {
      this.searchPokemonSubscription.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }

  subscriptionSearchPokemon() {
    const searchPokemon = this._shared.getSearchPokemon().subscribe((value: string) => {
      if (!value.trim()) {
        this.hasMorePokemons = true;
        this.isSearchingByFilter = false;
      } else {
        this.hasMorePokemons = true;
        this.isSearchingByFilter = true;
        this.filterValue = value;
      }
      this.offset = 0;
      this.pokemonList = [];
      this.getPokemons();
    });
    this.searchPokemonSubscription.push(searchPokemon);
  }

  getPokemons() {
    this.isLoading = true;
    if (this.isSearchingByFilter) {
      this._pokemonService.getPokemons(this.offset.toString(), this.limit.toString()).pipe(
        expand((data) => {
          delay(1000),
          this.hasMorePokemons = data.next ? true : false;
          if (this.hasMorePokemons) {
            this.offset += 50;
          } else {
            this.isLoading = false;
            return of();
          }
          return this._pokemonService.getPokemons(this.offset.toString(), this.limit.toString());
        }),
        flatMap((pokemonList: IPokemonList) => {
          const calls = [];
          pokemonList.results.forEach((pokemonData: IPokemonUrlData) => {
            calls.push(this._pokemonService.getPokemonInfoByNameOrId(pokemonData.name));
          });
          return forkJoin(calls);
        }),
        filter((pokemonData: IPokemonData[]) => pokemonData && pokemonData.length > 0),
      ).subscribe((pokemonData) => {
        pokemonData = pokemonData.filter((data) => {
          let typeValidation = false;
          data.types.filter((type) => {
            typeValidation = type.type.name.includes(this.filterValue);
          });
          return (data.name.includes(this.filterValue) || typeValidation) && !this.pokemonList.find((pokemon) => pokemon.id === data.id);
        });
        this.pokemonList = this.pokemonList.concat(pokemonData);
      });
    } else {
      this._pokemonService.getPokemons(this.offset.toString(), this.limit.toString()).pipe(
        expand((data: IPokemonList) => {
          if (data && data.results && data.results.length) {
            this.hasMorePokemons = data.next ? true : false;
            const calls = [];
            data.results.forEach((pokemonData: IPokemonUrlData) => {
              calls.push(this._pokemonService.getPokemonInfoByNameOrId(pokemonData.name));
            });
            return forkJoin(calls);
          }
          return of();
        }),
        delay(200)
      ).subscribe((pokemonData: IPokemonData[]) => {
        if (pokemonData && pokemonData.length) {
          this.pokemonList = this.pokemonList.concat(pokemonData);
          this.offset += 50;
          this.isLoading = false;
        }
      });
    }
  }

  getMorePokemons() {
    if (this.hasMorePokemons) {
      this.getPokemons();
    }
  }
}
