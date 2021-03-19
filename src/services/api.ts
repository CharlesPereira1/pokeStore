import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getTypeOfPokemonClass = (id: number) => {
  return api.get(`/type/${id}`);
};

export const getPokemonToType = (id: number) => {
  return api.get(`/pokemon/${id}`);
};

export const getPokemonSpecies = (id: number) => {
  return api.get(`/pokemon-species/${id}`);
};
