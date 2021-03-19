/* eslint-disable prefer-const */
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { useTheme } from 'styled-components';

import { getPokemonToType, getTypeOfPokemonClass } from '~/services/api';
import pokemonTypes from '~/assets/types';
import {
  CartProps,
  RepoPokemonProps,
  TypesProps,
  TypePokemonResponse,
} from './types';

interface TypePokemonProps {
  openCart: boolean;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
  types: any;
  setTypes: Dispatch<SetStateAction<any>>;
  repoPokemons: RepoPokemonProps[];
  itemsToCart: CartProps[];
  loadingPokemons: boolean;
  reloadPage(): void;
  handleTypeOfPokemonClass(id: number, type: any): void;
  handleSearch(value: string): void;
  handleAddToCart(item: RepoPokemonProps): void;
  handleSubQtdToCart(item: CartProps): void;
  handleRemoveToCart(item: CartProps): void;
}

const TypePokemonContext = createContext<TypePokemonProps>(
  {} as TypePokemonProps,
);

const TypePokemonProvider: React.FC = ({ children }) => {
  const [openCart, setOpenCart] = useState(false);
  const [types, setTypes] = useState<TypesProps>({} as TypesProps);
  const [loadingPokemons, setLoadingPokemons] = useState(false);
  const [repoPokemons, setRepoPokemons] = useState<RepoPokemonProps[]>([]);
  const [itemsToCart, setItemsToCart] = useState<CartProps[]>([]);
  const [repoPokemonsSearch, setRepoPokemonsSearch] = useState('');

  const { colors } = useTheme();

  const reloadPage = useCallback(() => {
    const listAddToCart = JSON.parse(localStorage.getItem('addToCart') || '[]');
    const listTypes = JSON.parse(localStorage.getItem('listTypes') || '[]');

    setTypes(listTypes);
    setItemsToCart(listAddToCart);
  }, [types, itemsToCart]);

  const handleTypeOfPokemonClass = useCallback(
    (id, type) => {
      const verifyPokemons = JSON.parse(
        localStorage.getItem('repoPokemon') || '[]',
      );
      const listAddToCart = JSON.parse(
        localStorage.getItem('addToCart') || '[]',
      );
      const listTypes = JSON.parse(localStorage.getItem('listTypes') || '[]');

      setTypes(type);

      if (listAddToCart) {
        setTypes(listTypes);
      }

      if (listAddToCart.length >= 1) {
        setItemsToCart(listAddToCart);
      }

      if (verifyPokemons.length >= 1) {
        setRepoPokemons(verifyPokemons);
        return;
      }

      getTypeOfPokemonClass(id)
        .then(res => {
          setRepoPokemons([]);

          res.data.pokemon.map((m: any) => {
            const idPokemon = m.pokemon.url
              .replace('https://pokeapi.co/api/v2/pokemon/', '')
              .replace('/', '');

            return handleGetPokemonClass(idPokemon, type);
          });
        })
        .catch(error => {
          console.log('error =>', error);
        });
    },
    [types],
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
      setRepoPokemons(addToRepoPokemon);
    }

    return { addToRepoPokemon };
  }, []);

  const handleGetPokemonClass = useCallback(
    (id, type) => {
      setLoadingPokemons(true);
      getPokemonToType(id)
        .then(res => {
          const { data } = res;

          const repoData = {
            id: data.id,
            name: data.name[0]?.toUpperCase() + data.name?.substr(1),
            price: data.base_experience,
            img: data.sprites.front_default,
            imgSvg: data.sprites.other['official-artwork'].front_default,
            idLoja: type.id,
            weight: `${data.weight / 10} kg`,
            specie: data.species.name,
            height: `${data.height / 10} m`,
            stats: {
              hp: data.stats[0].base_stat,
              attack: data.stats[1].base_stat,
              defense: data.stats[2].base_stat,
              specialAttack: data.stats[3].base_stat,
              specialDefense: data.stats[4].base_stat,
              speed: data.stats[5].base_stat,
            },
            type: data.types.map((pokemonType: TypePokemonResponse) => ({
              name: pokemonType.type.name,
              icon: pokemonTypes[pokemonType.type.name],
              color: colors.type[pokemonType.type.name],
            })),
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
    },
    [setRepoPokemons],
  );

  const handleAddToCart = useCallback(item => {
    const listAddToCart = JSON.parse(localStorage.getItem('addToCart') || '[]');
    const typeList = JSON.parse(localStorage.getItem('listTypes') || '[]');

    const { id, price, name, img, imgSvg } = item;

    const newListItem = {
      id,
      price,
      name,
      img,
      imgSvg,
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

      localStorage.setItem('addToCart', JSON.stringify(cartVerifyQtdDuplicate));

      setItemsToCart(cartVerifyQtdDuplicate);
    }
    if (!existObjInList) {
      listAddToCart.push(newListItem);
      localStorage.setItem('addToCart', JSON.stringify(listAddToCart));
      setItemsToCart(listAddToCart);
    }
  }, []);

  const handleSubQtdToCart = useCallback(item => {
    const listAddToCart = JSON.parse(localStorage.getItem('addToCart') || '[]');

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

      localStorage.setItem('addToCart', JSON.stringify(cartVerifyQtdDuplicate));

      setItemsToCart(cartVerifyQtdDuplicate);
    }
  }, []);

  const handleRemoveToCart = useCallback(item => {
    const listToCart = JSON.parse(localStorage.getItem('addToCart') || '[]');

    const existObjInList = listToCart.some((list: any) => list.id === item.id);

    if (existObjInList) {
      const removeItemIndex = listToCart.findIndex(
        (list: any) => list.id === item.id,
      );

      listToCart.splice(removeItemIndex, 1);

      localStorage.setItem('addToCart', JSON.stringify(listToCart));

      setItemsToCart(listToCart);
    }
  }, []);

  const handleSearch = useCallback(value => {
    setRepoPokemonsSearch(value);
  }, []);

  useEffect(() => {
    const repoPokemonStorage =
      JSON.parse(String(localStorage.getItem('repoPokemon'))) || [];

    const filterdCharacters = repoPokemonStorage.filter((item: any) => {
      return item.name.toLowerCase().includes(repoPokemonsSearch);
    });

    setRepoPokemons(filterdCharacters || repoPokemonStorage);
  }, [repoPokemonsSearch]);

  return (
    <TypePokemonContext.Provider
      value={{
        openCart,
        setOpenCart,
        types,
        setTypes,
        handleTypeOfPokemonClass,
        repoPokemons,
        handleSearch,
        loadingPokemons,
        reloadPage,
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
