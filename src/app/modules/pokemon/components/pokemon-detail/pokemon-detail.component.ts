import { IChainLink } from './../../../../models/interfaces/pokemon.interface';
import { Component, OnInit } from '@angular/core';
import { Shared } from 'src/app/shared/shared';
import { IPokemonData, ISpecie, IChainEvolution } from 'src/app/models/interfaces/pokemon.interface';
import { Pokemon } from 'src/app/models/classes/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: IPokemonData = {} as IPokemonData;
  evolutionsList: string[] = [];

  constructor(private shared: Shared, private pokemonService: Pokemon) { }

  ngOnInit() {
    this.pokemon = this.shared.getPokemonData();
    this.getSpecie(this.pokemon.species.name);
  }

  getSpecie(name: string) {
    this.pokemonService.getSpeciesByNameOrId(name).subscribe((specie: ISpecie) => {
      const data = specie.evolution_chain.url.split('/');
      this.getChainEvolution(data[data.length - 2]);
    });
  }

  getChainEvolution(name: string) {
    this.pokemonService.getChainEvolutionById(name).subscribe((chainEvolution: IChainEvolution) => {
      this.evolutionsList.push(chainEvolution.chain.species.name);
      if (chainEvolution.chain.evolves_to && chainEvolution.chain.evolves_to.length) {
        this.getEvolutions(chainEvolution.chain.evolves_to[0]);
      }
    });
  }

  getEvolutions(evolve: IChainLink) {
    this.evolutionsList.push(evolve.species.name);
    if (evolve.evolves_to && evolve.evolves_to.length) {
      this.getEvolutions(evolve.evolves_to[0]);
    } else {
      return;
    }
  }
}
