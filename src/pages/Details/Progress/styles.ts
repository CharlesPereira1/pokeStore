import styled from 'styled-components';

import { colors } from '~/styles/theme';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  span {
    font-size: 14px;
    color: ${colors.text};
  }
`;
