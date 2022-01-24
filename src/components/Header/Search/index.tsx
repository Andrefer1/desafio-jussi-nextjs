import { useState, useMemo, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

import api from "../../../services/api";

import styles from "./search.module.scss";

type Pokemon = {
  name: string;
  strongedName?: string;
};

export function Search() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/");

      const pokemonsName = response.data.results.map((pokemon: Pokemon) => ({
        name: pokemon.name,
      }));

      setPokemons(pokemonsName);
    };

    getData();
  }, []);

  const filteredPokemons: Pokemon[] | null = useMemo(() => {
    const searchLower = search.toLowerCase();

    if (search === "") {
      return null;
    }

    const pokemonsList = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchLower)
    );

    return pokemonsList.map((pokemon) => ({
      ...pokemon,
      strongedName: ` 
      ${pokemon.name.slice(
        0,
        pokemon.name.indexOf(search)
      )}<strong>${search}</strong>${pokemon.name.slice(
        search.length + pokemon.name.indexOf(search)
      )}
      `,
    }));
  }, [pokemons, search]);

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
          {filteredPokemons
            ?.slice(0, 10)
            .map(({ name, strongedName }: Pokemon) => (
              <Link key={name} href={`/pokemon/${name}`}>
                <a
                  className={styles.product}
                  dangerouslySetInnerHTML={{
                    __html: String(strongedName),
                  }}
                ></a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
