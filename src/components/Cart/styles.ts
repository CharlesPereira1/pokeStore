import styled from 'styled-components';
import { shade } from 'polished';
import { Layout } from 'antd';

import { colors } from '~/styles/theme';

const { Sider } = Layout;

const { Content } = Layout;

interface CardtProps {
  bgColor: string;
}

export const SiderStyle = styled.div<CardtProps>`
  display: flex;

  width: 400px;
  height: 90vh;

  background: ${({ bgColor }) => bgColor};
  padding: 10px;
  margin: 10px;
  position: relative;

  justify-content: center;

  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);

  h3 {
    width: 400px;
    text-align: center;
    font-weight: bold;
    padding: 5px 0;
    border-bottom: 1px solid ${colors.border};
  }

  @media (max-width: 600px) {
    max-width: 590px;
    height: 50vh;
    margin: 0 auto;
    margin-top: 20px;
  }
  @media (max-width: 412px) {
    width: 100%;
    max-width: 380px;
    height: 50vh;
  }
`;

export const ProductTable = styled.div`
  height: 75vh;
  display: flex;
  flex-direction: column;
  max-width: 100%;

  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  padding-right: 10px;

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

  li {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 3fr 2fr 2.5fr;
    justify-content: space-between;
    padding-top: 10px;

    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${colors.border};

    div:nth-child(1) {
      img {
        width: 60px;
        height: 60px;
      }
    }
    div:nth-child(2) {
      align-items: center;
      display: flex;
      flex-direction: column;
      strong {
        font-size: 14px;
      }
      > span {
        display: flex;
        align-items: center;
        max-height: 35px;

        > img {
          width: 20px;
          height: 20px;
        }

        > p {
          font-size: 13px;
          font-weight: 700;
          margin-top: 23px;
        }
      }
    }

    div:nth-child(3) {
      display: flex;
      flex-direction: column;

      span {
        display: flex;
        align-items: center;
        flex-direction: row;

        input {
          border: 1px solid ${colors.border};
          border-radius: 4px;
          color: ${colors.text};
          width: 45px;
          text-align: center;
          font-size: 12px;
          margin: 0 5px;
        }

        > button {
          svg {
            margin-top: 8px;
          }
          :disabled {
            svg {
              fill: ${colors.danger};
            }
          }
        }
      }

      > button {
        text-align: center;
        text-decoration: underline;
        font-size: 16px;
        margin-top: -5px;
      }
    }

    div:nth-child(4) {
    }
  }

  .subTotal {
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }

    p {
      font-size: 14px;
      font-weight: 700;
      margin-top: 22px;
    }
  }

  @media (max-width: 600px) {
    height: 30vh;
  }
`;

export const Total = styled.div`
  width: 95%;
  position: absolute;
  align-items: center;
  bottom: 0;
  margin-bottom: 20px;
  border-top: 1px solid ${colors.border};

  footer {
    display: flex;
    flex-direction: column;

    button {
      width: 100%;
      background: ${colors.btSuccess};
      color: ${colors.white};
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;

      &:hover {
        background: ${shade(0.2, colors.barBkColor)};
      }
    }
  }

  div {
    display: flex;
    text-align: center;
    justify-content: center;
    margin: 10px;

    strong {
      font-size: 18px;
      font-weight: bold;
      margin-top: 8px;
      margin-right: 5px;
    }

    span {
      display: flex;
      align-items: center;
      max-height: 35px;

      > img {
        width: 20px;
        height: 20px;
        margin: 0px 5px;
      }

      p {
        font-size: 18px;
        font-weight: bold;
        margin-top: 27px;
      }
    }
  }
`;
