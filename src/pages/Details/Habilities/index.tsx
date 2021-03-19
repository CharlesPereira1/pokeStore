import React from 'react';

import {
  RepoPokemonProps,
  useGetToTypePokemon,
} from '~/hooks/useGetToTypePokemon';

import dolarSvg from '~/assets/svg/dollarSign.svg';

import { Container } from './styles';

interface ProgressProps {
  pokemons: RepoPokemonProps;
}

const Habilities: React.FC<ProgressProps> = ({ pokemons }) => {
  const { handleAddToCart } = useGetToTypePokemon();

  return (
    <Container>
      <div>
        <div>
          <img src={pokemons?.imgSvg} alt="" />
        </div>
        <div>
          <span>
            <h3>{pokemons?.name}</h3>

            <span>
              <img src={dolarSvg} alt="" />
              <p>{pokemons?.price}</p>
            </span>
            {pokemons?.type?.map(m => (
              <strong key={m.name} style={{ background: m.color }}>
                {m.name}
              </strong>
            ))}
          </span>
          <button
            onClick={() => {
              handleAddToCart(pokemons);
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Habilities;
