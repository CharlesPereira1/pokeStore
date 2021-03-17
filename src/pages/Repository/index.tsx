/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { List } from 'antd';

import { AiOutlineSearch } from 'react-icons/ai';
import Cart from '~/components/Cart';
import { InputContainer as Input } from '~/components/Input/styles';

import { useGetToTypePokemon } from '~/hooks/useGetToTypePokemon';

import dolarSvg from '~/assets/svg/dollarSign.svg';
import pokebola from '~/assets/pokebola.png';

import {
  LayoutStyle,
  HeaderStyle,
  BadgeStyle,
  ContentStyle,
  ProductList,
  CardList,
  SiderStyle,
} from './styles';

const Repository: React.FC = () => {
  const [openCart, setOpenCart] = useState(false);

  const {
    handleTypeOfPokemonClass,
    repoPokemons,
    repoPokemonsSearch,
    loadingPokemons,
    handleSearch,
    handleAddToCart,
  } = useGetToTypePokemon();
  const history = useHistory();

  const typeList = JSON.parse(String(localStorage.getItem('listTypes')));

  const handleGoBack = useCallback(() => {
    history.goBack();
    localStorage.removeItem('repoPokemon');
  }, []); // eslint-disable-line

  useEffect(() => {
    document.title = `PokeStore | ${typeList?.name}`;

    if (typeList.id) {
      handleTypeOfPokemonClass(typeList.id);
    }
  }, []); // eslint-disable-line

  return (
    <LayoutStyle>
      <HeaderStyle
        style={{ background: typeList?.bgColor, padding: '0px' }}
        btnColor={typeList?.btnColor}
      >
        <div>
          <span className="headerBack">
            <button onClick={handleGoBack}>
              <span>
                <IoMdArrowBack size={30} />
                {typeList?.name}
              </span>
            </button>
          </span>

          <div>
            <Input
              placeholder="Digite o nome do Pokemon"
              onChange={e => handleSearch(e.target.value)}
            />
            <AiOutlineSearch size={20} color="#000" />
          </div>

          {/* <Search
            placeholder="Digite o nome do Pokemon"
            // onSearch={onSearch}
            loading={false}
            allowClear
            size="large"
            bordered={false}
            onChange={e => handleSearch(e.target.value)}
          /> */}

          <BadgeStyle count={1} dot btnColor={typeList?.btnColor}>
            <button onClick={() => setOpenCart(prev => !prev)}>
              <FaShoppingCart size={28} />
            </button>
          </BadgeStyle>
        </div>
      </HeaderStyle>
      <LayoutStyle>
        <ContentStyle>
          <List
            loading={!!loadingPokemons}
            grid={{
              gutter: 16,
              column: 1,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 6,
            }}
            locale={{
              emptyText: 'Nenhuma lista encontrada',
            }}
            dataSource={
              repoPokemonsSearch?.length >= 1
                ? repoPokemonsSearch
                : repoPokemons
            }
            // dataSource={repoPokemons}
            renderItem={(item, index) => (
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
        {openCart && (
          <SiderStyle
            width={390}
            style={{ background: typeList?.bgColor, height: '90vh' }}
          >
            <Cart
              themeStyle={{
                bgColor: typeList?.bgColor,
                btnColor: typeList?.btnColor,
              }}
            />
          </SiderStyle>
        )}
      </LayoutStyle>
    </LayoutStyle>
  );
};

export default Repository;
