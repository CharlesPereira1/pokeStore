import { createGlobalStyle } from 'styled-components';

import { colors } from './theme';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    /* a cada 1rem será considerado 10px */
    font-size: 62.5%;

    max-width: 100vw;
    max-height: 100vh;

    width: 100%;
    height: 100%;

    background: ${colors.white};

  }

  body {
    color: ${colors.text};
    -webkit-font-smoothing: antialiased;
  }

  *, body, input , button {
    font-family: 'Nunito', sans-serif;
    font-size: 1.6rem;
    text-rendering: optimizelegibility;
    outline: none;
    color: ${colors.text};
  }

  h1, h2, h4, h5, h6, strong {
    font-weight: 500;
  }

  button{
    cursor: pointer;
    background: none;
    border: none;
  }

  li {
    list-style:none;
  }

  a {
    text-decoration: none;
  }
`;
