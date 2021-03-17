import styled from 'styled-components';
import { lighten } from 'polished';
import { Layout, Badge } from 'antd';

import { colors } from '~/styles/theme';

interface RepoPropsStyle {
  bgColor?: string;
  btnColor?: string;
}

const { Header } = Layout;

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
  p {
    color: ${colors.white};
    font-size: 10px;
  }
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
