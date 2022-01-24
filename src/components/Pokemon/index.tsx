import { useState } from "react";

import { SiPokemon } from "react-icons/si";
import { CgGhostCharacter } from "react-icons/cg";
import { MdCatchingPokemon } from "react-icons/md";
import { ImPower } from "react-icons/im";
import { IoMdStats } from "react-icons/io";
import { GiDiscGolfBag, GiSwordsEmblem } from "react-icons/gi";
import { GrCircleInformation } from "react-icons/gr";

import { AbilityPokemonModal } from "../AbilityPokemonModal";

import styles from "./pokemon.module.scss";

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
  pokemon: {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    abilities: Ability[];
    held_items: HeldItems[];
    stats: Stat[];
  };
};

export function Pokemon({ pokemon }: PokemonProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [abilityModal, setAbilityModal] = useState<string>("");

  function toggleModal(): void {
    setAbilityModal("");
    setModalOpen(!modalOpen);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AbilityPokemonModal
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          ability={abilityModal}
        />

        <header>
          <SiPokemon size={100} />
          <div id={styles.content}>
            <div className={styles.title}>
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
            <div className={styles.box}>
              <span>Altura</span>
              <p>{(pokemon.height * 10).toFixed(0)} CM</p>
            </div>

            <div className={styles.box}>
              <span>Peso</span>
              <p>{(pokemon.weight * 0.1).toFixed(1)} KG</p>
            </div>
          </div>
        </div>

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

        <div id={styles.stats}>
          <div className={styles.title}>
            <IoMdStats size={21} />
            <h3>Estatísticas</h3>
            <div className={styles.information}>
              <GrCircleInformation size={13} />
              <p>Lista de valores de estatísticas básicas para este Pokémon</p>
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

        <div id={styles.items}>
          {pokemon.held_items !== [] && (
            <>
              <div className={styles.title}>
                <GiDiscGolfBag size={21} />
                <h3>Itens</h3>
                <div className={styles.information}>
                  <GrCircleInformation size={13} />
                  <p>
                    Lista de itens que este Pokémon pode estar segurando quando
                    encontrado
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
      </div>
    </div>
  );
}
