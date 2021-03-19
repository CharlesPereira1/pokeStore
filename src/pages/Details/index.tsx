import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useTheme } from 'styled-components';

import Header from '~/components/Header';
import pokemonTypes from '~/assets/types';
import Cart from '~/components/Cart';
import Habilities from './Habilities';
import Profile from './Profile';
import Progress from './Progress';

import { getPokemonSpecies, getTypeOfPokemonClass } from '~/services/api';

import {
  PokemonTypesProps,
  RepoPokemonProps,
  useGetToTypePokemon,
} from '~/hooks/useGetToTypePokemon';

import { Container, Content } from './styles';

interface AboutProps {
  colorText?: string;
}
interface ParamType {
  idPokemon?: string;
}

interface SpecieProps {
  capture_rate: string;
  base_happiness: string;
  growth_rate: string;
}

const Details: React.FC<AboutProps> = () => {
  const [weaknesses, setWeaknesses] = useState<PokemonTypesProps[]>([]);
  const [pokemonSpecie, setPokemonSpecie] = useState<SpecieProps>(
    {} as SpecieProps,
  );

  const { repoPokemons, openCart, setOpenCart } = useGetToTypePokemon();

  const types = JSON.parse(localStorage.getItem('listTypes') || '[]');

  const history = useHistory();
  const params = useParams<ParamType>();
  const { colors } = useTheme();

  const handleGoBack = useCallback(() => {
    history.push(`/store/${types.id}/${types.type}`);
    setOpenCart(true);
  }, []);

  const pokemons: RepoPokemonProps = repoPokemons
    .map(m => m)
    .filter(list => list.id === Number(params.idPokemon))[0];

  useEffect(() => {
    if (repoPokemons) {
      getPokemonSpecies(Number(params.idPokemon)).then(response => {
        const { capture_rate, base_happiness, growth_rate } = response.data;

        setPokemonSpecie({
          capture_rate,
          base_happiness,
          growth_rate: growth_rate.name.replace('-', ' '),
        });
      });

      getTypeOfPokemonClass(types.id).then(response => {
        const {
          damage_relations: { double_damage_from },
        } = response.data;
        const auxWeaknesses = double_damage_from.map(
          (typeDamage: { name: keyof typeof pokemonTypes }) => ({
            icon: pokemonTypes[typeDamage.name],
            color: colors.type[typeDamage.name],
            name: typeDamage.name,
          }),
        );
        setWeaknesses(auxWeaknesses);
      });
    }
  }, [repoPokemons, setWeaknesses]);

  return (
    <>
      <Header handleGoBack={handleGoBack} />

      <Container>
        <Content openCart={openCart}>
          <Habilities pokemons={pokemons} />

          <h3>Profile</h3>
          <hr />

          <Profile
            pokemons={pokemons}
            weaknesses={weaknesses}
            pokemonSpecie={pokemonSpecie}
          />

          <h3>Stats</h3>
          <hr />

          <Progress pokemons={pokemons} />
        </Content>
        {openCart && <Cart />}
      </Container>
    </>
  );
};

export default Details;
