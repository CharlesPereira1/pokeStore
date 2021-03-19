import { SVGProps } from 'react';
import pokemonTypes from '~/assets/types';

export interface CartProps {
  id: number;
  price: number;
  name: string;
  img: string;
  imgSvg: string;
  qtd: number;
  idLoja: number;
  subTotal: number;
}

export interface PokemonTypesProps {
  name?: string;
  icon: SVGProps<SVGSVGElement>;
  color: string;
}

export interface RepoPokemonProps {
  id: number;
  price: number;
  name: string;
  img: string;
  imgSvg: string;
  idLoja: number;
  weight?: string;
  specie?: string;
  height?: string;
  stats?: {
    hp?: string;
    attack?: string;
    defense?: string;
    specialAttack?: string;
    specialDefense?: string;
    speed?: string;
  };
  type?: PokemonTypesProps[];
}

export interface TypePokemonResponse {
  type: {
    name: keyof typeof pokemonTypes;
  };
}

export interface TypesProps {
  bgColor: string;
  btnColor: string;
  id: number;
  name: string;
  type: string;
}
