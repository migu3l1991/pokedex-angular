import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPokemonData } from '../models/interfaces/pokemon.interface';

@Injectable()
export class Shared {
  private statusActionsHeader: Subject<boolean> = new Subject<boolean>();
  private searchPokemon: Subject<string> = new Subject<string>();
  private editMode = false;
  private pokemonData: IPokemonData;
  private emailProfile: string;

  setStatusHomeActionHeader(newStatus: boolean) {
    this.statusActionsHeader.next(newStatus);
  }

  getStatusHomeActionHeader() {
    return this.statusActionsHeader.asObservable();
  }

  setSearchPokemon(value: string) {
    this.searchPokemon.next(value);
  }

  getSearchPokemon() {
    return this.searchPokemon.asObservable();
  }

  setEditMode(status: boolean) {
    this.editMode = status;
  }

  getEditMode() {
    return this.editMode;
  }

  setPokemonData(podemon: IPokemonData) {
    this.pokemonData = podemon;
  }

  getPokemonData() {
    return this.pokemonData;
  }

  setEmailProfile(email: string) {
    this.emailProfile = email;
  }

  getEmailProfile() {
    return this.emailProfile;
  }
}
