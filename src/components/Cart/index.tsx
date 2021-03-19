/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { AiOutlineStop } from 'react-icons/ai';
import swal from 'sweetalert';
import { Modal } from 'antd';
import { useHistory } from 'react-router-dom';

import {
  CartProps as CartPropsHook,
  useGetToTypePokemon,
} from '~/hooks/useGetToTypePokemon';

import dolarSvg from '~/assets/svg/dollarSign.svg';
import pokebola from '~/assets/pokebola.png';

import { SiderStyle, ProductTable, Total } from './styles';

const Cart: React.FC = () => {
  const {
    types,
    itemsToCart,
    handleAddToCart,
    handleSubQtdToCart,
    handleRemoveToCart,
  } = useGetToTypePokemon();

  const { confirm } = Modal;
  const history = useHistory();

  const totalList = itemsToCart
    .filter((fList: CartPropsHook) => fList.idLoja === types.id)
    .reduce((total: number, item) => {
      return total + item.subTotal;
    }, 0);

  const handleConfirmRemove = (list: CartPropsHook) => {
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

    const clearItensList = itemsToCart.filter(
      (fList: CartPropsHook) => fList.idLoja !== types.id,
    );

    localStorage.setItem('addToCart', JSON.stringify(clearItensList));

    setTimeout(() => {
      history.push('/');
    }, 1500);
  };

  return (
    <SiderStyle bgColor={types.bgColor}>
      {!itemsToCart.some(
        (fList: CartPropsHook) => fList.idLoja === types.id,
      ) ? (
        'Nenhum pokemon no carrinho.'
      ) : (
        <>
          <ProductTable>
            <h3>CARRINHO</h3>
            {itemsToCart
              .filter((fList: CartPropsHook) => fList.idLoja === types.id)
              .map((listCard: CartPropsHook) => (
                <div key={listCard.id}>
                  <li>
                    <div>
                      <img
                        src={listCard.imgSvg || pokebola}
                        alt={listCard.name}
                      />
                    </div>
                    <div>
                      <strong>{listCard.name.substr(0, 13)}</strong>
                      <span>
                        <img src={dolarSvg} alt={listCard.name} />
                        <p>{listCard.price}</p>
                      </span>
                    </div>
                    <div>
                      <span>
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
                      </span>
                      <button onClick={() => handleConfirmRemove(listCard)}>
                        <small>excluir</small>
                      </button>
                    </div>
                    <div>
                      <strong className="subTotal">
                        <img src={dolarSvg} alt="" />
                        <p>{listCard.subTotal}</p>
                      </strong>
                    </div>
                  </li>
                </div>
              ))}
          </ProductTable>

          <Total>
            <footer>
              <div>
                <strong>TOTAL:</strong>
                <span>
                  <img src={dolarSvg} alt="" />
                  <p>{totalList}</p>
                </span>
              </div>
              <button onClick={handleFinallyShop}>Finalizar pedido</button>
            </footer>
          </Total>
        </>
      )}
    </SiderStyle>
  );
};

export default Cart;
