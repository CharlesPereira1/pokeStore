import React, { Dispatch, SetStateAction } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { useGetToTypePokemon } from '~/hooks/useGetToTypePokemon';

import Input from '../Input';

import { HeaderStyle, BadgeStyle } from './styles';

interface HeaderProps {
  qtdCartList: number;
  handleGoBack: () => void;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  qtdCartList,
  handleGoBack,
  setOpenCart,
}) => {
  const { handleSearch } = useGetToTypePokemon();

  const typeList = JSON.parse(localStorage.getItem('listTypes') || '[]');

  return (
    <HeaderStyle
      style={{ background: typeList?.bgColor, padding: '0px' }}
      btnColor={typeList.btnColor && typeList?.btnColor}
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

        <BadgeStyle
          size="small"
          count={qtdCartList}
          btnColor={typeList.btnColor && typeList?.btnColor}
        >
          <button onClick={() => setOpenCart(prev => !prev)}>
            <FaShoppingCart size={28} />
          </button>
        </BadgeStyle>
      </div>
    </HeaderStyle>
  );
};

export default Header;
