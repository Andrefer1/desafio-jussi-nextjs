import { useState } from "react";
import { SiPokemon } from "react-icons/si";
import { CgGhostCharacter } from "react-icons/cg";
import { MdCatchingPokemon } from "react-icons/md";
import { ImPower } from "react-icons/im";
import { IoMdStats } from "react-icons/io";
import { GiDiscGolfBag, GiSwordsEmblem } from "react-icons/gi";
import { GrCircleInformation } from "react-icons/gr";
import axios, { AxiosResponse } from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { AbilityPokemonModal } from "../../components/AbilityPokemonModal";

import Custom404 from "../404/404";

import styles from "./pokemonPost.module.scss";

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

interface PokemonPostProps {
  pokemon: PokemonProps | null;
}

export default function PokemonPost({
  pokemon,
}: PokemonPostProps): JSX.Element {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [abilityModal, setAbilityModal] = useState<string>("");

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!pokemon) {
    return <Custom404 />;
  }

  function toggleModal(): void {
    setAbilityModal("");
    setModalOpen(!modalOpen);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title> {pokemon.name} | Jüssi</title>
      </Head>
      <div className={styles.content}>
        <AbilityPokemonModal
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          ability={abilityModal}
        />

        <header>
          <SiPokemon size={100} />
          <div id={styles.content}>
            <div id={styles.pokemonName}>
              <MdCatchingPokemon size={32} />
              <h1>{pokemon.name}</h1>
            </div>

            <p id={styles.id}>{pokemon.id}</p>
          </div>
        </header>

        <div id={styles.characteristics}>
          <div className={styles.title}>
            <CgGhostCharacter size={25} />
            <h3>Características</h3>
            <div className={styles.information}>
              <GrCircleInformation size={13} />
              <p>Características físicas deste Pokémon</p>
            </div>
          </div>

          <div id={styles.content}>
            {pokemon.height !== 0 && (
              <div className={styles.box}>
                <span>Altura</span>
                <p>{(pokemon.height * 10).toFixed(0)} CM</p>
              </div>
            )}

            {pokemon.height !== 0 && (
              <div className={styles.box}>
                <span>Peso</span>
                <p>{(pokemon.weight * 0.1).toFixed(1)} KG</p>
              </div>
            )}
          </div>
        </div>

        {pokemon.abilities.length !== 0 && (
          <div id={styles.abilities}>
            <div className={styles.title}>
              <ImPower size={21} />
              <h3>Habilidades</h3>
              <div className={styles.information}>
                <GrCircleInformation size={13} />
                <p>Lista de habilidades que este Pokémon pode ter</p>
              </div>
            </div>

            <div id={styles.content}>
              {pokemon.abilities?.map(({ ability }: Ability) => (
                <button
                  key={ability.name}
                  onClick={() => {
                    toggleModal();
                    setAbilityModal(ability.name);
                  }}
                >
                  <p> {ability.name} </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {pokemon.base_experience !== 0 && (
          <div id={styles.experience}>
            <div className={styles.title}>
              <GiSwordsEmblem size={21} />
              <h3>Experiência Base</h3>
              <div className={styles.information}>
                <GrCircleInformation size={13} />
                <p>Experiência básica obtida ao derrotar este Pokémon</p>
              </div>
            </div>

            <div id={styles.content}>
              <div className={styles.box}>
                <p>{pokemon.base_experience}</p>
              </div>
            </div>
          </div>
        )}
        {pokemon.stats.length !== 0 && (
          <div id={styles.stats}>
            <div className={styles.title}>
              <IoMdStats size={21} />
              <h3>Estatísticas</h3>
              <div className={styles.information}>
                <GrCircleInformation size={13} />
                <p>Estatísticas básicas deste Pokémon</p>
              </div>
            </div>

            <div id={styles.content}>
              {pokemon.stats?.map(({ base_stat, effort, stat }: Stat) => (
                <div key={stat.name} className={styles.box}>
                  <span>{stat.name}</span>
                  <p>{base_stat}</p>
                  <p>{effort}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {pokemon.held_items.length !== 0 && (
          <div id={styles.items}>
            {pokemon.held_items !== [] && (
              <>
                <div className={styles.title}>
                  <GiDiscGolfBag size={21} />
                  <h3>Itens</h3>
                  <div className={styles.information}>
                    <GrCircleInformation size={13} />
                    <p>
                      Lista de itens que este Pokémon pode estar segurando
                      quando encontrado
                    </p>
                  </div>
                </div>

                {pokemon.held_items.map(
                  ({ item, version_details }: HeldItems) => (
                    <div key={item.name} className={styles.item}>
                      <span>{item.name}</span>

                      <div>
                        {version_details.map((detail) => (
                          <div key={detail.version.name} className={styles.box}>
                            <span>{detail.version.name}</span>
                            <p>{detail.rarity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0"
  );

  const paths = pokemons.data.results.map((pokemon: PokemonProps) => ({
    params: { name: pokemon.name },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log(`Building name: ${params?.name}`);

  const response: AxiosResponse<PokemonProps> = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params?.name}`
  );

  if (!response) {
    return {
      notFound: true,
    };
  }

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
