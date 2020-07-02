export interface IPokemonData {
  sprites?: ISprite;
  id?: number;
  name?: string;
  types?: IType[];
  height?: number;
  weight?: number;
  moves?: IMoves[];
  species?: {
    name?: string;
    url?: string;
  };
}

export interface IPokemonList {
  count: number;
  next: string;
  previous: string;
  results: IPokemonUrlData[];
}

export interface IPokemonUrlData {
  name: string;
  url: string;
}

interface IType {
  type?: {
    name?: string;
    url?: string;
  };
}

interface ISprite {
  front_default?: string;
  back_default?: string;
}

interface IMoves {
  move?: {
    name?: string;
    url?: string;
  };
}

export interface ISpecie {
  evolution_chain?: {
    url?: string;
  };
}

export interface IChainEvolution {
  chain?: IChainLink;
}

export interface IChainLink {
  species?: {
    name?: string;
  };
  evolves_to?: IChainLink[];
}
