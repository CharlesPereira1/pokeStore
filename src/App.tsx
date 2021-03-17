import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalProvider from './hooks';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes />
      </GlobalProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
