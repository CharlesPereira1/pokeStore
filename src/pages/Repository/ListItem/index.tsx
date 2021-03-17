import React from 'react';
import { List } from 'antd';
import { useGetToTypePokemon } from '~/hooks/useGetToTypePokemon';

import dolarSvg from '~/assets/svg/dollarSign.svg';
import pokebola from '~/assets/pokebola.png';

import { CardList, ContentStyle, ProductList } from './styles';

const ListItem: React.FC = () => {
  const {
    repoPokemons,
    repoPokemonsSearch,
    loadingPokemons,
    handleAddToCart,
  } = useGetToTypePokemon();

  const typeList = JSON.parse(localStorage.getItem('listTypes') || '[]');

  return (
    <ContentStyle>
      <List
        loading={!!loadingPokemons}
        grid={{
          gutter: 16,
          column: 1,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 4,
          xl: 5,
          xxl: 6,
        }}
        locale={{
          emptyText: 'Nenhuma lista encontrada',
        }}
        dataSource={
          repoPokemonsSearch?.length >= 1 ? repoPokemonsSearch : repoPokemons
        }
        renderItem={item => (
          <List.Item style={{ border: '0px', padding: '0px' }}>
            <CardList style={{ background: typeList?.bgColor }}>
              <ProductList
                bgColor={typeList?.bgColor}
                btnColor={typeList?.btnColor}
              >
                <li>
                  <img src={item?.img ?? pokebola} alt={item?.name} />

                  <strong>{item?.name}</strong>

                  <span>
                    <img src={dolarSvg} alt="" />
                    <p>{item?.price}</p>
                  </span>

                  <button onClick={() => handleAddToCart(item)}>
                    Adicionar
                  </button>
                </li>
              </ProductList>
            </CardList>
          </List.Item>
        )}
      />
    </ContentStyle>
  );
};

export default ListItem;
