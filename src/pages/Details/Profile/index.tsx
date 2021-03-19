import React from 'react';

import { PokemonTypesProps, RepoPokemonProps } from '~/hooks/types';

import { Container, Weaknesse } from './styles';

interface ProgressProps {
  pokemons: RepoPokemonProps;
  weaknesses: PokemonTypesProps[];
  pokemonSpecie: {
    capture_rate: string;
    base_happiness: string;
    growth_rate: string;
  };
}

const Profile: React.FC<ProgressProps> = ({
  pokemons,
  weaknesses,
  pokemonSpecie,
}) => {
  return (
    <Container>
      <div>
        <div>
          <span>
            <b>Species:</b> {pokemons?.specie}
          </span>
          <span>
            <b>Heigth:</b> {pokemons?.height}
          </span>
          <span>
            <b>Weigth:</b> {pokemons?.weight}
          </span>
          <span>
            <b>Weaknesses:</b>{' '}
            {weaknesses.map(weank => (
              <Weaknesse key={weank?.color} color={weank?.color}>
                {weank?.icon}
              </Weaknesse>
            ))}
          </span>
        </div>
        <div>
          <span>
            <b>Catch Rate:</b> {pokemonSpecie?.capture_rate}
          </span>
          <span>
            <b>Base Friendship:</b> {pokemonSpecie?.base_happiness}
          </span>
          <span>
            <b>Growth Rate:</b> {pokemonSpecie?.growth_rate}
          </span>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
