/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ReactNode, useEffect, useMemo } from 'react';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { AiOutlineStop } from 'react-icons/ai';
import swal from 'sweetalert';
import { Modal } from 'antd';
import { useHistory } from 'react-router-dom';

import { PokemonProps, useGetToTypePokemon } from '~/hooks/useGetToTypePokemon';

import dolarSvg from '~/assets/svg/dollarSign.svg';
import pokebola from '~/assets/pokebola.png';

import { ProductTable, Total } from './styles';

interface CartProps extends PokemonProps {
  themeStyle?: {
    bgColor?: string;
    btnColor?: string;
  };
}

const Cart: React.FC<CartProps> = () => {
  const listAddToCart = JSON.parse(localStorage.getItem('addToCart') || '[]');
  const typeList = JSON.parse(localStorage.getItem('listTypes') || '[]');

  const { confirm } = Modal;
  const history = useHistory();
  const {
    handleAddToCart,
    handleSubQtdToCart,
    handleRemoveToCart,
  } = useGetToTypePokemon();

  const lista = listAddToCart
    .filter((fList: any) => fList.idLoja === typeList.id)
    .reduce((total: any, item: any) => {
      return total + item.subTotal;
    }, 0);

  const handleConfirmRemove = (list: PokemonProps) => {
    confirm({
      title: `Você realmente deseja deletar o pokemon ${list.name} do seu carrinho?`,
      icon: '',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk() {
        handleRemoveToCart(list);
      },
    });
  };

  const handleFinallyShop = () => {
    swal({
      icon: 'success',
      title: 'Obrigado por finalizar compra.',
      text: 'Volte sempre a comprar conosco e evoluir cada vez mais.',
      timer: 1500,
    });

    const clearItensList = listAddToCart.filter(
      (fList: any) => fList.idLoja !== typeList.id,
    );

    localStorage.setItem('addToCart', JSON.stringify(clearItensList));

    setTimeout(() => {
      history.goBack();
    }, 1500);
  };

  return (
    <>
      {!listAddToCart.some((fList: any) => fList.idLoja === typeList.id) ? (
        'Nenhum pokemon no carrinho.'
      ) : (
        <>
          <ProductTable>
            <thead>
              <tr>
                <th />
                <th>POKEMON</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {listAddToCart
                .filter((fList: any) => fList.idLoja === typeList.id)
                .map((listCard: CartProps) => (
                  <tr key={listCard.id}>
                    <td>
                      <img src={listCard.img} alt={listCard.name} />
                    </td>
                    <td>
                      <strong>{listCard.name || pokebola}</strong>
                      <span>
                        <img src={dolarSvg} alt="" />
                        <p>{listCard.price}</p>
                      </span>
                    </td>

                    <td>
                      <div>
                        <button
                          onClick={() => handleSubQtdToCart(listCard)}
                          disabled={listCard.qtd === 0}
                        >
                          {listCard.qtd === 0 ? (
                            <AiOutlineStop size={14} />
                          ) : (
                            <MdRemoveCircleOutline size={16} />
                          )}
                        </button>
                        <input
                          type="number"
                          readOnly
                          disabled
                          value={listCard.qtd}
                        />
                        <button onClick={() => handleAddToCart(listCard)}>
                          <MdAddCircleOutline size={16} />
                        </button>
                      </div>
                      <button onClick={() => handleConfirmRemove(listCard)}>
                        <small>excluir</small>
                      </button>
                    </td>
                    <td>
                      <strong className="subTotal">
                        <img src={dolarSvg} alt="" />
                        <p>{listCard.subTotal}</p>
                      </strong>
                    </td>
                    <td />
                  </tr>
                ))}
            </tbody>
          </ProductTable>

          <Total>
            <footer>
              <div>
                <strong>TOTAL:</strong>
                <span>
                  <img src={dolarSvg} alt="" />
                  <p>{lista}</p>
                </span>
              </div>
              <button onClick={handleFinallyShop}>Finalizar pedido</button>
            </footer>
          </Total>
        </>
      )}
    </>
  );
};

export default Cart;
