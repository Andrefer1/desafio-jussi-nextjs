import { useState, useMemo, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

import api from "../../../services/api";

import styles from "./search.module.scss";

type Pokemon = {
  name: string;
  url: string;
};

export function Search() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/");

      setPokemons(response.data.results);
    };

    getData();
  }, []);

  const filteredProducts: Pokemon[] | null = useMemo(() => {
    const searchLower = search.toLowerCase();

    if (search === "") {
      return null;
    }

    const pokemonsList = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchLower)
    );

    return pokemonsList.map((pokemon) => ({
      ...pokemon,
      name: ` 
      ${pokemon.name.slice(
        0,
        pokemon.name.indexOf(search)
      )}<strong>${search}</strong>${pokemon.name.slice(
        search.length + pokemon.name.indexOf(search)
      )}
      `,
    }));
  }, [pokemons, search]);

  function abc(event: any): any {
    return console.log(123123);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <input
          type="text"
          placeholder="Buscar"
          list="suggestions"
          onChange={(event) => setSearch(event.target.value)}
        />

        <FiSearch size={22} id={styles.icon} />

        <div id={styles.searchResult}>
          {filteredProducts?.slice(0, 10).map((pokemon: Pokemon) => (
            <div key={pokemon.name} className={styles.product}>
              <Link href={`${pokemon.url}`}>
                <a
                  id={pokemon.name}
                  onClick={(event) => abc(event)}
                  className={styles.pokemonLink}
                  dangerouslySetInnerHTML={{ __html: pokemon.name }}
                ></a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
