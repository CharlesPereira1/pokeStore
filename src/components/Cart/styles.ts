import styled from 'styled-components';
import { shade } from 'polished';
import { colors } from '~/styles/theme';

export const ProductTable = styled.div`
  height: 75vh;

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

  thead th {
    color: #999;
    text-align: left;

    text-align: center;
    font-size: 12px;
  }

  tbody td {
    padding: 4px 2px;
    border-bottom: 1px solid #eee;

    > img {
      height: 75px;
    }

    > strong {
      color: #333;
      display: block;
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
        font-size: 14px;
        font-weight: 700;
        margin-top: 23px;
      }
    }

    div {
      display: flex;
      align-items: center;

      input {
        border: 1px solid #eee;
        border-radius: 4px;
        color: #666;
        width: 45px;
        padding: 0;
        text-align: center;
        padding-left: 10px;
        padding-right: 0;
        font-size: 10px;
      }
      > button {
        :disabled {
          svg {
            fill: red;
          }
        }
        padding: 3px;
        margin-top: 3px;
        flex-direction: column;
      }
    }
  }

  button {
    display: flex;

    small {
      display: flex;
      margin-left: 26px;
      justify-content: center;
      text-decoration: underline;
    }
  }

  .subTotal {
    display: flex;
    align-items: center;
    max-height: 35px;

    margin: 5px 20px 10px;

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
`;

export const Total = styled.div`
  width: 95%;
  position: absolute;
  align-items: center;
  bottom: 0;
  margin-bottom: 20px;
  border-top: 1px solid #eee;

  footer {
    display: flex;
    flex-direction: column;
    /* flex-direction: c; */
    /* justify-content: space-between; */

    button {
      width: 100%;
      background: green;
      color: #fff;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;

      &:hover {
        background: ${shade(0.2, 'green')};
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
