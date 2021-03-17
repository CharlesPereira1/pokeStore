import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getTypeOfPokemonClass = (id: number) => {
  return api.get(`/type/${id}`);
};

export const getPokemonToType = (id: number) => {
  return api.get(`/pokemon/${id}`);
};
