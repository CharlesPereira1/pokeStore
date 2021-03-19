import React from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';

import { useGetToTypePokemon } from '~/hooks/useGetToTypePokemon';

import dolarSvg from '~/assets/svg/dollarSign.svg';
import pokebola from '~/assets/pokebola.png';

import { CardList, ContentStyle, ProductList } from './styles';

interface ListItemProps {
  openCart?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ openCart }) => {
  const {
    types,
    repoPokemons,
    loadingPokemons,
    handleAddToCart,
  } = useGetToTypePokemon();

  // const typeList = JSON.parse(localStorage.getItem('listTypes') || '[]');

  return (
    <ContentStyle style={{ maxWidth: openCart ? '1520px' : '100%' }}>
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
        dataSource={repoPokemons}
        renderItem={item => (
          <>
            <List.Item key={item.id}>
              <CardList style={{ background: types?.bgColor }}>
                <ProductList
                  bgColor={types?.bgColor}
                  btnColor={types?.btnColor}
                >
                  <li>
                    <img src={item?.imgSvg ?? pokebola} alt={item?.name} />

                    <strong>{item?.name}</strong>

                    <div>
                      <span>
                        <img src={dolarSvg} alt="" />
                        <p>{item?.price}</p>
                      </span>
                      <Link to={`/details/${item.id}/pokemon`}>Detalhe</Link>
                    </div>

                    <button onClick={() => handleAddToCart(item)}>
                      Adicionar
                    </button>
                  </li>
                </ProductList>
              </CardList>
            </List.Item>
          </>
        )}
      />
    </ContentStyle>
  );
};

export default ListItem;
