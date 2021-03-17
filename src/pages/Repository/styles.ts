import styled, { css } from 'styled-components';
import { shade, lighten } from 'polished';
import { Layout, Card, Badge } from 'antd';
import { colors } from '~/styles/theme';

const { Header, Sider, Content } = Layout;

interface RepoPropsStyle {
  bgColor?: string;
  btnColor?: string;
}

export const LayoutStyle = styled(Layout)`
  background: #fff;
`;

export const HeaderStyle = styled(Header)<RepoPropsStyle>`
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 68px;
    padding: 0 30px;
  }

  .headerBack {
    max-width: 100px;

    button {
      display: flex;
      align-items: center;
      span {
        display: flex;
        align-items: center;
        color: ${({ btnColor }) => btnColor};
        font-weight: 700;
        font-size: min(20px, 4vw);

        svg {
          width: min(30px, 5vw);
          height: min(30px, 5vw);
          fill: ${({ btnColor }) => btnColor};
          margin-right: 5px;
        }
      }
      :hover {
        span {
          color: ${props => props.btnColor && lighten(0.1, props.btnColor)};
          svg {
            &:hover {
              fill: ${props => props.btnColor && lighten(0.1, props.btnColor)};
            }
          }
        }
      }
    }
  }

  div:nth-child(2) {
    width: 60%;
    position: relative;
    svg {
      position: absolute;

      right: 35px;
    }
  }

  @media (max-width: 455px) {
    div {
      padding: 0px 10px;
    }

    div:nth-child(2) {
      input {
        ::placeholder {
          font-size: 12px;
        }
      }

      svg {
        right: 15px;
      }
    }
  }
`;

export const BadgeStyle = styled(Badge)<RepoPropsStyle>`
  button {
    svg {
      fill: ${({ btnColor }) => btnColor};
      width: min(30px, 5vw);
      height: min(30px, 5vw);

      &:hover {
        fill: ${props => props.btnColor && lighten(0.1, props.btnColor)};
      }
    }
  }
`;

export const ContentStyle = styled(Content)`
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
  background: #fff;
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
      background: #e5e5e5;
    }

    > strong {
      font-size: 18px;
      line-height: 20px;
      color: #333;
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
      color: #fff;
      border-radius: 4px;
      margin-top: auto;
      font-weight: 500;

      &:hover {
        background: ${({ btnColor }) => btnColor && shade(0.2, btnColor)};
      }
    }
  }
`;

export const SiderStyle = styled(Sider)`
  ${shadowCss}

  background: #fff;
  padding: 10px;
  margin: 10px 10px 10px 0;
  position: relative;
`;
