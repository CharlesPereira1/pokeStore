/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ListItem from './ListItem';
import Cart from '~/components/Cart';
import Header from '~/components/Header';

import { useGetToTypePokemon } from '~/hooks/useGetToTypePokemon';

import { LayoutStyle, Container } from './styles';

const Repository: React.FC = () => {
  const [openCart, setOpenCart] = useState(false);

  const { handleTypeOfPokemonClass } = useGetToTypePokemon();
  const history = useHistory();

  const typeList = JSON.parse(localStorage.getItem('listTypes') || '[]');
  const listAddToCart = JSON.parse(localStorage.getItem('addToCart') || '[]');

  const handleGoBack = useCallback(() => {
    history.goBack();
    localStorage.removeItem('repoPokemon');
  }, []); // eslint-disable-line

  const qtdCartList = listAddToCart.filter(
    (fList: any) => fList.idLoja === typeList.id,
  ).length;

  useEffect(() => {
    document.title = `PokeStore | ${typeList?.name}`;

    if (typeList.id) {
      handleTypeOfPokemonClass(typeList.id);
    }
  }, []); // eslint-disable-line

  return (
    <>
      <LayoutStyle>
        <Header
          qtdCartList={qtdCartList}
          handleGoBack={handleGoBack}
          setOpenCart={setOpenCart}
        />
      </LayoutStyle>

      {/* <LayoutStyle> */}
      <Container>
        <ListItem />
        {openCart && (
          <Cart
            themeStyle={{
              bgColor: typeList?.bgColor,
              btnColor: typeList?.btnColor,
            }}
          />
        )}
      </Container>
      {/* </LayoutStyle> */}
    </>
  );
};

export default Repository;
