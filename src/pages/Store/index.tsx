import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ListItem from './ListItem';
import Cart from '~/components/Cart';
import Header from '~/components/Header';

import { useGetToTypePokemon } from '~/hooks/useGetToTypePokemon';

import { LayoutStyle, Container } from './styles';

const Story: React.FC = () => {
  const { openCart, handleTypeOfPokemonClass } = useGetToTypePokemon();
  const history = useHistory();

  const types = JSON.parse(localStorage.getItem('listTypes') || '[]');

  const handleGoBack = useCallback(() => {
    history.push('/');
    localStorage.removeItem('repoPokemon');
  }, []);

  useEffect(() => {
    document.title = `PokeStore | ${types?.name}`;

    if (types.id) {
      handleTypeOfPokemonClass(types.id, types);
    }
  }, []);

  return (
    <>
      <LayoutStyle>
        <Header handleGoBack={handleGoBack} />
      </LayoutStyle>

      <Container>
        <ListItem openCart={openCart} />
        {openCart && <Cart />}
      </Container>
    </>
  );
};

export default Story;
