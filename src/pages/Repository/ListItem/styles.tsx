import styled, { css } from 'styled-components';
import { shade, lighten } from 'polished';
import { Layout, Card, Badge } from 'antd';
import { colors } from '~/styles/theme';

const { Content } = Layout;

interface RepoPropsStyle {
  bgColor?: string;
  btnColor?: string;
}

export const ContentStyle = styled(Content)`
  max-width: 1520px;
  margin: 10px 10px;
  padding-right: 10px;

  height: 90vh;

  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${shade(0.2, colors.parisWhite)};
    border-radius: 3px;
    .with-high-contrast & {
      background: ${colors.barBk};
    }
  }
  ::-webkit-scrollbar-track {
    background-color: ${colors.barBkColor};
    border-radius: 3px;
  }
`;

const shadowCss = css`
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
`;

export const CardList = styled(Card)`
  padding: 0px;
  background: ${colors.white};
  ${shadowCss}
`;

export const ProductList = styled.ul<RepoPropsStyle>`
  list-style: none;
  width: 100%;
  height: 100%;
  margin-bottom: -10px;

  li {
    display: flex;
    flex-direction: column;

    > img {
      align-self: center;
      max-width: 96px;
      max-height: 96px;
      border-radius: 50%;
      border: 2px solid ${({ btnColor }) => btnColor};
      background: ${colors.bgImg};
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: ${colors.text};
      margin-top: 10px;
    }

    > span {
      display: flex;
      align-items: center;
      max-height: 35px;

      margin: 5px 0 10px;

      > img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
      > p {
        font-size: 20px;
        font-weight: 700;
        margin-top: 22px;
      }
    }

    button {
      height: 35px;
      align-items: center;
      display: block;
      background: ${({ btnColor }) => btnColor};
      color: ${colors.white};
      border-radius: 4px;
      margin-top: auto;
      font-weight: 500;

      &:hover {
        background: ${({ btnColor }) => btnColor && shade(0.2, btnColor)};
      }
    }
  }
`;
