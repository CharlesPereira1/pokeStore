import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalProvider from './hooks';

import Routes from './routes';

import theme from './styles/theme/index';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalProvider>
          <Routes />
        </GlobalProvider>
      </ThemeProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
