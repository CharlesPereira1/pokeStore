import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getPokemonToType, getTypeOfPokemonClass } from '~/services/api';

interface TypePokemonProps {
  handleTypeOfPokemonClass(id: number): void;
  handleGetPokemonClass(id: number): void;
  repoPokemons: RepoPokemonProps[];
  repoPokemonsSearch: RepoPokemonProps[];
  itemsToCart: PokemonProps[];
  loadingPokemons: boolean;
  handleSearch(value: string): void;
  handleAddToCart(item: PokemonProps): void;
  handleSubQtdToCart(item: PokemonProps): void;
  handleRemoveToCart(item: PokemonProps): void;
}

interface RepoPokemonProps {
  id: number;
  price: number;
  name: string;
  img: string;
  idLoja: number;
}

export interface PokemonProps {
  id?: number;
  price?: number;
  name?: string;
  img?: string;
  qtd?: number;
  subTotal?: number;
}

const TypePokemonContext = createContext<TypePokemonProps>(
  {} as TypePokemonProps,
);

const TypePokemonProvider: React.FC = ({ children }) => {
  const [loadingPokemons, setLoadingPokemons] = useState(false);
  const [repoPokemons, setRepoPokemons] = useState<RepoPokemonProps[]>([]);
  const [itemsToCart, setItemsToCart] = useState<PokemonProps[]>([]);
  const [repoPokemonsSearch, setRepoPokemonsSearch] = useState<
    RepoPokemonProps[]
  >([]);

  const typeList = JSON.parse(localStorage.getItem('listTypes') || '[]');

  // functions
  const handleTypeOfPokemonClass = useCallback(
    id => {
      const addToRepoPokemon = JSON.parse(
        localStorage.getItem('repoPokemon') || '[]',
      );
      // debugger;

      if (addToRepoPokemon.length >= 1) {
        setRepoPokemons(addToRepoPokemon);
        return;
      }

      getTypeOfPokemonClass(id)
        .then(res => {
          setRepoPokemons([]);

          res.data.pokemon
            .map((m: any) =>
              m.pokemon.url
                .replace('https://pokeapi.co/api/v2/pokemon/', '')
                .replace('/', ''),
            )
            .map((id: any) => handleGetPokemonClass(id));
        })
        .catch(error => {
          console.log('error =>', error);
        });
    },
    [setRepoPokemons], // eslint-disable-line
  );

  const handleGetLocalStorage = useCallback(repoData => {
    const addToRepoPokemon =
      JSON.parse(String(localStorage.getItem('repoPokemon'))) || [];

    const existObjInList = addToRepoPokemon.some(
      (list: any) => list.id === repoData.id,
    );

    if (!existObjInList) {
      addToRepoPokemon.push(repoData);
      localStorage.setItem('repoPokemon', JSON.stringify(addToRepoPokemon));
    }

    return { addToRepoPokemon };
  }, []);

  const handleGetPokemonClass = useCallback(id => {
    setLoadingPokemons(true);
    const typeList = JSON.parse(localStorage.getItem('listTypes') || '[]');

    getPokemonToType(id)
      .then(res => {
        const repoData = {
          id: res.data.id,
          name: res.data.name,
          price: res.data.base_experience,
          img: res.data.sprites.front_default,
          idLoja: typeList.id,
        };

        setRepoPokemons(prev => [...prev, repoData]);

        handleGetLocalStorage(repoData);
      })
      .catch(error => {
        console.log('error =>', error);
      })
      .finally(() =>
        setTimeout(() => {
          setLoadingPokemons(false);
        }, 1000),
      );
  }, []); // eslint-disable-line

  const handleSearch = useCallback(
    value => {
      if (value.length >= 2) {
        const filterdCharacters = repoPokemons.filter(item => {
          return item.name.includes(value);
        });

        setRepoPokemonsSearch(filterdCharacters);
      }

      if (value.length === 0) {
        setRepoPokemonsSearch([]);
      }
    },
    [repoPokemons],
  );

  const handleAddToCart = useCallback(
    item => {
      const listAddToCart = JSON.parse(
        localStorage.getItem('addToCart') || '[]',
      );
      const typeList = JSON.parse(localStorage.getItem('listTypes') || '[]');

      const newListItem = {
        ...item,
        qtd: 1,
        subTotal: item.price * 1,
        idLoja: typeList.id,
      };

      const existObjInList = listAddToCart.some(
        (list: any) => list.id === newListItem.id,
      );

      if (existObjInList) {
        const cartVerifyQtdDuplicate = listAddToCart.map((list: any) => {
          let listAddQtd = { ...list };
          if (list.id === item.id) {
            listAddQtd = {
              ...list,
              idLoja: typeList.id,
              qtd: list.qtd + 1,
              subTotal: (list.qtd + 1) * list.price,
            };
          }

          return listAddQtd;
        });

        localStorage.setItem(
          'addToCart',
          JSON.stringify(cartVerifyQtdDuplicate),
        );

        setItemsToCart(cartVerifyQtdDuplicate);
      }
      if (!existObjInList) {
        listAddToCart.push(newListItem);
        localStorage.setItem('addToCart', JSON.stringify(listAddToCart));
        setItemsToCart(listAddToCart);
      }
    },
    [], // eslint-disable-line
  );

  const handleSubQtdToCart = useCallback(
    item => {
      const listAddToCart = JSON.parse(
        localStorage.getItem('addToCart') || '[]',
      );

      const existObjInList = listAddToCart.some(
        (list: any) => list.id === item.id,
      );

      if (existObjInList) {
        const cartVerifyQtdDuplicate = listAddToCart.map((list: any) => {
          let listAddQtd = { ...list };
          if (list.id === item.id) {
            listAddQtd = {
              ...list,
              qtd: list.qtd - 1,
              subTotal: (list.qtd - 1) * list.price,
            };
          }

          return listAddQtd;
        });

        localStorage.setItem(
          'addToCart',
          JSON.stringify(cartVerifyQtdDuplicate),
        );

        setItemsToCart(cartVerifyQtdDuplicate);
      }
    },
    [], // eslint-disable-line
  );

  const handleRemoveToCart = useCallback(
    item => {
      const listToCart = JSON.parse(localStorage.getItem('addToCart') || '[]');

      const existObjInList = listToCart.some(
        (list: any) => list.id === item.id,
      );

      if (existObjInList) {
        const removeItemIndex = listToCart.findIndex(
          (list: any) => list.id === item.id,
        );

        listToCart.splice(removeItemIndex, 1);

        localStorage.setItem('addToCart', JSON.stringify(listToCart));

        setItemsToCart(listToCart);
      }
    },
    [], // eslint-disable-line
  );

  return (
    <TypePokemonContext.Provider
      value={{
        handleTypeOfPokemonClass,
        handleGetPokemonClass,
        repoPokemons,
        handleSearch,
        repoPokemonsSearch,
        loadingPokemons,
        itemsToCart,
        handleAddToCart,
        handleSubQtdToCart,
        handleRemoveToCart,
      }}
    >
      {children}
    </TypePokemonContext.Provider>
  );
};

const useGetToTypePokemon = (): TypePokemonProps => {
  const context = useContext(TypePokemonContext);

  if (!context) {
    throw new Error(
      'useGetToTypePokemon must be used within an DrawerProvider',
    );
  }

  return context;
};

export { TypePokemonProvider, useGetToTypePokemon };
