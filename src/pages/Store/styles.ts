import styled from 'styled-components';

import { Layout } from 'antd';
import { colors } from '~/styles/theme';

export const LayoutStyle = styled(Layout)`
  background: ${colors.white};
  display: flex;
`;
export const Container = styled.div`
  background: ${colors.white};
  display: flex;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
