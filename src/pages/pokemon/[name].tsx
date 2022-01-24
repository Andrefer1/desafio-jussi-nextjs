import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import styles from "./pokemonPost.module.scss";
import axios, { AxiosResponse } from "axios";
import { Pokemon } from "../../components/Pokemon";

type Ability = {
  ability: {
    name: string;
  };
};

type HeldItems = {
  item: {
    name: string;
  };
  version_details: {
    rarity: number;
    version: {
      name: string;
    };
  }[];
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
};

type PokemonProps = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: Ability[];
  held_items: HeldItems[];
  stats: Stat[];
};

interface GStaticProps {
  props: {
    pokemon: PokemonProps | null;
  };
}

interface PokemonPostProps {
  pokemon: PokemonProps;
}

export default function PokemonPost({
  pokemon,
}: PokemonPostProps): JSX.Element {
  return (
    <>
      <Head>
        <title> {pokemon.name} | Jüssi</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <Pokemon pokemon={pokemon} />
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0"
  );

  const paths = pokemons.data.results.map((pokemon: any) => ({
    params: { name: pokemon.name },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GStaticProps> => {
  const response: AxiosResponse<PokemonProps> = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params?.name}`
  );
  const res = response.data;

  const pokemon: PokemonProps = {
    id: res.id,
    name: res.name,
    height: res.height,
    weight: res.weight,
    base_experience: res.base_experience,

    abilities: res.abilities.map(({ ability }: Ability) => ({
      ability: {
        name: ability.name,
      },
    })),

    stats: res.stats.map(({ base_stat, effort, stat }: Stat) => ({
      base_stat: base_stat,
      effort: effort,
      stat: {
        name: stat.name,
      },
    })),

    held_items: res.held_items.map(({ item, version_details }: HeldItems) => ({
      item: {
        name: item.name,
      },
      version_details: version_details.map(({ rarity, version }) => ({
        rarity: rarity,
        version: {
          name: version.name,
        },
      })),
    })),
  };

  return {
    props: { pokemon },
  };
};
