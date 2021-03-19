import styled from 'styled-components';

import { colors } from '~/styles/theme';

export const Container = styled.div`
  display: flex;
  padding: 0 50px;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 40px;

    b {
      margin-right: 10px;
    }

    div:nth-child(1) {
      width: 50%;
      display: flex;
      flex-direction: column;
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 620px) {
    > div {
      flex-direction: column;
      margin: 0 auto;
    }
  }
`;

export const Weaknesse = styled.li`
  display: inline;
  text-align: center;
  align-items: center;
  background: ${props => props.color};
  padding: 7px 4px 0px;
  border-radius: 6px;

  svg {
    width: 18px;
    height: 18px;

    path {
      fill: ${colors.white};
    }
  }

  margin-right: 6px;
`;
