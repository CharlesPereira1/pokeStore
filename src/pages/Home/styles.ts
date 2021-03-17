import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { Layout, Card } from 'antd';

import { colors } from '~/styles/theme';

const { Content } = Layout;

interface HomePropsStyle {
  bgColor?: string;
  btnColor?: string;
}

export const LayoutStyle = styled(Layout)`
  background: ${colors.white};
`;

export const ContentStyle = styled(Content)`
  padding: 10px;
  margin: 10px 30px 10px 40px;
`;

const shadowCss = css`
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
`;

export const CardList = styled(Card)`
  ${shadowCss}

  padding: 0px;
`;

export const ProductList = styled.ul<HomePropsStyle>`
  list-style: none;
  width: 100%;
  height: 100%;
  margin-bottom: -10px;

  span {
    display: flex;
    color: ${colors.text};
    font-size: 30px;
    margin: 20px 0 30px;
    justify-content: center;
  }

  button {
    height: 50px;
    width: 100%;
    align-items: center;
    display: block;
    background: ${({ btnColor }) => btnColor};
    border: none;
    color: ${colors.white};
    border-radius: 4px;
    margin-top: auto;
    font-weight: 600;

    &:hover {
      background: ${({ btnColor }) => btnColor && shade(0.2, btnColor)};
    }
  }
`;
