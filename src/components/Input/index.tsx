import React, { InputHTMLAttributes } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import { InputContainer } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <>
      <InputContainer {...rest} />
    </>
  );
};

export default Input;
