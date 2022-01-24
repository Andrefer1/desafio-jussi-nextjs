import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { Pokemon } from "../Pokemon";

import styles from "./abilityPokemonModal.module.scss";

type Pokemon = {
  pokemon: {
    name: string;
  };
};

type EffectEntries = {
  effect: string;
  short_effect: string;
  language: {
    name: string;
  };
};

type EffectChanges = {
  version_group: {
    name: string;
  };
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
};

type Ability = {
  id: number;
  name: string;
  pokemon: Pokemon[];

  effect_entries: EffectEntries[];

  effect_changes: EffectChanges[];
};

interface ShowPokemonModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  ability: string;
}

export function AbilityPokemonModal({
  isOpen,
  setIsOpen,
  ability,
}: ShowPokemonModalProps) {
  const [abilityData, setAbilityData] = useState<Ability>();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get<Ability>(
        `https://pokeapi.co/api/v2/ability/${ability}`
      );

      const res = response.data;

      const pokemonAbility: Ability = {
        id: res.id,
        name: res.name,

        pokemon: res.pokemon?.map(({ pokemon }: Pokemon) => ({
          pokemon: { name: pokemon.name },
        })),

        effect_entries: res.effect_entries?.filter(
          ({ language }: EffectEntries) => language?.name === "en"
        ),

        effect_changes: res.effect_changes?.map(
          ({ version_group, effect_entries }: EffectChanges) => ({
            version_group: version_group,
            effect_entries: effect_entries.filter(
              ({ language }) => language.name === "en"
            ),
          })
        ),
      };

      setAbilityData(pokemonAbility);
    };

    getData();
  }, [ability]);

  async function handlePokemon() {
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <div className={styles.content}>
          {abilityData && (
            <>
              <header>
                <h2>{abilityData.name}</h2>
                <p>{abilityData.id}</p>
              </header>

              <div id={styles.effect_entries}>
                <h3>Efeitos da habilidade</h3>
                <div>
                  {abilityData.effect_entries?.map(
                    ({ effect, short_effect }, index) => (
                      <div key={index}>
                        <p>{short_effect}</p>
                        <p>{effect}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div id={styles.effect_changes}>
                <h3>
                  Efeitos anteriores que a habilidade teve em outros grupos
                </h3>
                <div>
                  {abilityData.effect_changes?.map(
                    ({ version_group, effect_entries }) => (
                      <div key={version_group.name}>
                        <h4>Versão do Grupo</h4>
                        <p id={styles.groupName}>{version_group.name}</p>
                        <div>
                          {effect_entries.map(({ effect }) => (
                            <p key={effect}>{effect}</p>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div id={styles.pokemons}>
                <h3>Pokémons que poderiam ter esta habilidade</h3>
                <div>
                  {abilityData.pokemon?.map(({ pokemon }) => (
                    <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
                      <a onClick={handlePokemon}>{pokemon.name}</a>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
