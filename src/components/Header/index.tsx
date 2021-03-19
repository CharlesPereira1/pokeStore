import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';

import { useGetToTypePokemon } from '~/hooks/useGetToTypePokemon';

import Input from '../Input';

import { HeaderStyle, HeaderContent, Badgebutton } from './styles';

interface HeaderProps {
  handleGoBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleGoBack }) => {
  const [itemBadge, setItemBadge] = useState<number>(0 as number);

  const { setOpenCart, handleSearch } = useGetToTypePokemon();

  const types = JSON.parse(localStorage.getItem('listTypes') || '[]');
  const itemsToCart = JSON.parse(localStorage.getItem('addToCart') || '[]');

  useEffect(() => {
    if (itemsToCart) {
      const qtdCartList = itemsToCart.filter(
        (fList: any) => fList.idLoja === types.id,
      ).length;

      setItemBadge(qtdCartList);
    }
  }, [itemsToCart]);

  return (
    <HeaderStyle style={{ background: types?.bgColor, padding: '0px' }}>
      <HeaderContent btnColor={types?.btnColor}>
        <span className="headerBack">
          <button onClick={handleGoBack}>
            <span>
              <IoMdArrowBack size={30} />
              {types?.name}
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

        <div>
          <Badgebutton btnColor={types?.btnColor}>
            <button type="button" onClick={() => setOpenCart(prev => !prev)}>
              <div>
                <FaShoppingCart size={28} />
                <small />
                <p>{itemBadge}</p>
              </div>
            </button>
          </Badgebutton>
        </div>
      </HeaderContent>
    </HeaderStyle>
  );
};

export default Header;
