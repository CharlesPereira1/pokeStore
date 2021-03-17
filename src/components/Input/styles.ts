import styled from 'styled-components';

import { colors } from '~/styles/theme';

export const InputContainer = styled.input`
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${colors.border};
  padding: 1.8rem 3rem 1.6rem 1.4rem;
  color: ${colors.text};

  ::placeholder {
    color: ${colors.text};
  }
`;
