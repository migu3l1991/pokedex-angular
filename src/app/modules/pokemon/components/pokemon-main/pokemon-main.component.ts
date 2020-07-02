import { Shared } from './../../../../shared/shared';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-main',
  templateUrl: './pokemon-main.component.html',
  styleUrls: ['./pokemon-main.component.scss']
})
export class PokemonMainComponent implements OnInit, OnDestroy {
  showHomeAction = false;
  pokemonName = '';
  statusActionsSubscription: Subscription;
  @ViewChild('pokemonSearchInput', { static: true }) pokemonSearchInput: ElementRef;

  constructor(private _router: Router, private _shared: Shared) {}

  ngOnInit() {
    this.headerActionSubscription();
    this.keyupEventInput();
  }

  ngOnDestroy(): void {
    this.statusActionsSubscription.unsubscribe();
  }

  navigatePokemonList() {
    this.showHomeAction = false;
    this._router.navigate(['home/pokemon-list']);
  }

  exit() {
    this._router.navigate(['home']);
  }

  editProfile() {
    this._shared.setEditMode(true);
    this._router.navigate(['home/account']);
  }

  headerActionSubscription() {
    this.statusActionsSubscription = this._shared.getStatusHomeActionHeader().subscribe((newStatus: boolean) => {
      this.showHomeAction = newStatus;
      this.pokemonSearchInput.nativeElement.value = '';
      if (this.showHomeAction) {
        this.pokemonName = this._shared.getPokemonData().name;
      }
    });
  }

  keyupEventInput() {
    fromEvent(this.pokemonSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      filter(res => res.length >= 0),
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe((name: string) => {
      this._shared.setSearchPokemon(name);
    });
  }
}
