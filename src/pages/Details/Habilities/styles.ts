import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '~/styles/theme';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    justify-content: space-between;
    div:nth-child(1) {
      img {
        width: 290px;
        height: 290px;
        margin-right: 20px;

        @media (max-width: 620px) {
          width: 200px;
          height: 200px;
        }
      }
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      span {
        h3 {
          font-size: 35px;
          font-weight: bold;
          color: ${colors.text};
          margin: 20px 0;
        }

        > span {
          display: flex;
          align-items: center;
          max-height: 35px;

          margin: -10px 0 20px;

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

        strong {
          font-size: 16px;
          color: ${colors.white};
          margin: 20px 0;
          border-radius: 4px;
          padding: 5px;

          & + strong {
            margin-left: 15px;
          }
        }
      }

      button {
        width: 100%;
        margin-top: 15px;
        background: ${colors.btSuccess};
        color: ${colors.white};
        border-radius: 4px;
        padding: 10px 20px;
        font-size: min(16px, 3vw);
        font-weight: bold;
        text-transform: uppercase;

        &:hover {
          background: ${shade(0.2, colors.btSuccess)};
        }
      }
    }

    @media (max-width: 620px) {
      justify-content: center;
    }
    @media (max-width: 464px) {
      justify-content: center;
      margin: 0 auto;
      flex-direction: column;
    }
  }
`;
