import { Component, OnInit, OnDestroy } from '@angular/core';
import { Shared } from 'src/app/shared/shared';
import { Pokemon } from 'src/app/models/classes/pokemon';
import { IPokemonData, IPokemonList, IPokemonUrlData } from 'src/app/models/interfaces/pokemon.interface';
import { forkJoin, of, Subscription, throwError } from 'rxjs';
import { expand, delay, filter, takeWhile } from 'rxjs/operators';

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
        expand((data: IPokemonList) => {
          if (data && data.results && data.results.length) {
            this.hasMorePokemons = data.next ? true : false;
            const calls = [];
            data.results.forEach((pokemonData: IPokemonUrlData) => {
              calls.push(this._pokemonService.getPokemonInfoByNameOrId(pokemonData.name));
            });
            return forkJoin(calls);
          }
          if (this.hasMorePokemons) {
            this.offset += 50;
            return this._pokemonService.getPokemons(this.offset.toString(), this.limit.toString()).pipe(
              delay(1000),
              expand((data1: IPokemonList) => {
                if (data1 && data1.results && data1.results.length) {
                  const calls = [];
                  data1.results.forEach((pokemonData: IPokemonUrlData) => {
                    calls.push(this._pokemonService.getPokemonInfoByNameOrId(pokemonData.name));
                  });
                  return forkJoin(calls);
                }
                return of();
              }),
            );
          }
          if (!this.hasMorePokemons) {
            this.isLoading = false;
          }
          return of();
        }),
        filter((data) => data && data.length > 0),
        delay(1000)
      ).subscribe((pokemonData: IPokemonData[]) => {
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
