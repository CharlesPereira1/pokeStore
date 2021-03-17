import React from 'react';

import { TypePokemonProvider } from './useGetToTypePokemon';

const GlobalProvider: React.FC = ({ children }) => (
  // Criar auth em volta de todos os provider
  /**
   * Ex: <AuthProvider>...</AuthProvider>
   */

  <TypePokemonProvider>{children}</TypePokemonProvider>
);

export default GlobalProvider;
