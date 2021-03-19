import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '~/styles/theme';

interface ContainerrProps {
  openCart: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;

  > h3 {
    width: 100%;
    text-align: center;
    font-weight: bold;

    :nth-child(1) {
      text-align: left;
    }
  }

  > hr {
    border: 1px solid ${colors.border};
    margin-bottom: 5px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    margin: auto;
  }
`;

export const Content = styled.div<ContainerrProps>`
  width: ${({ openCart }) => (openCart ? '70%' : '90%')};
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 800px) {
    padding: 10px;
  }
`;
