import React from 'react';
import { Progress as ProgressCont } from 'antd';

import { RepoPokemonProps } from '~/hooks/types';

import { colors as colorTheme } from '~/styles/theme';
import { Container } from './styles';

interface ProgressProps {
  pokemons: RepoPokemonProps;
}

const Progress: React.FC<ProgressProps> = ({ pokemons }) => {
  return (
    <Container>
      <span>
        HP{' '}
        <ProgressCont
          percent={Number(pokemons?.stats?.hp)}
          strokeColor={{
            '30': colorTheme.danger,
          }}
        />
      </span>
      <span>
        Attack{' '}
        <ProgressCont
          percent={Number(pokemons?.stats?.attack)}
          strokeColor={{
            '30': colorTheme.danger,
          }}
        />
      </span>
      <span>
        Defense{' '}
        <ProgressCont
          percent={Number(pokemons?.stats?.defense)}
          strokeColor={{
            '30': colorTheme.danger,
          }}
        />
      </span>
      <span>
        Speed{' '}
        <ProgressCont
          percent={Number(pokemons?.stats?.speed)}
          strokeColor={{
            '30': colorTheme.danger,
          }}
        />
      </span>
      <span>
        Special Attack{' '}
        <ProgressCont
          percent={Number(pokemons?.stats?.specialAttack)}
          strokeColor={{
            '30': colorTheme.danger,
          }}
        />
      </span>
      <span>
        Special Defense{' '}
        <ProgressCont
          percent={Number(pokemons?.stats?.defense)}
          strokeColor={{
            '30': colorTheme.danger,
          }}
        />
      </span>
    </Container>
  );
};

export default Progress;
