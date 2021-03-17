/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ReactNode, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { List } from 'antd';

import { LayoutStyle, ContentStyle, ProductList, CardList } from './styles';

import { storyList } from '~/styles/storeTheme';

interface RepositoryProps {
  children: ReactNode;
}

const Home: React.FC<RepositoryProps> = ({ children }) => {
  const history = useHistory();

  const handleAcessStore = useCallback(list => {
    localStorage.setItem('listTypes', JSON.stringify(list));
    history.push(`/repository/${list.id}/${list.type}`);
  }, []); // eslint-disable-line

  return (
    <LayoutStyle>
      <ContentStyle style={{ padding: '60px' }}>
        <List
          grid={{
            gutter: 25,
            column: 4,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          dataSource={storyList}
          renderItem={(list, index) => (
            <List.Item style={{ border: '0px', padding: '0px' }}>
              <CardList style={{ background: list.bgColor }}>
                <ProductList bgColor={list.bgColor} btnColor={list.btnColor}>
                  <li>
                    <span>{list.name}</span>

                    <button onClick={() => handleAcessStore(list)}>
                      Acessar Loja
                    </button>
                  </li>
                </ProductList>
              </CardList>
            </List.Item>
          )}
        />
      </ContentStyle>
    </LayoutStyle>
  );
};

export default Home;
