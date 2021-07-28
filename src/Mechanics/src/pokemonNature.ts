import {PokemonStat} from "./pokemon";

export class PokemonNature{
    name: string;
    decreasedStat: string | null;
    increasedStat: string | null;

    constructor(name: string, decreasedStat: string | null, increasedStat: string |null) {
        this.name = name;
        this.decreasedStat = decreasedStat;
        this.increasedStat = increasedStat;
    }

    pokemonNatureToStat(): PokemonStat{
    return {
      hp: (this.increasedStat === 'hp'? 1.1 : 1) * ( this.decreasedStat === 'hp'? 0.9 : 1 ),
      attack: (this.increasedStat === 'attack'? 1.1 : 1) * ( this.decreasedStat === 'attack'? 0.9 : 1 ),
      defense: (this.increasedStat === 'defense'? 1.1 : 1) * ( this.decreasedStat === 'defense'? 0.9 : 1 ),
      speAttack: (this.increasedStat === 'special-attack'? 1.1 : 1) * ( this.decreasedStat === 'special-attack'? 0.9 : 1 ),
      speDefense: (this.increasedStat === 'special-defense'? 1.1 : 1) * ( this.decreasedStat === 'special-defense'? 0.9 : 1 ),
      speed: (this.increasedStat === 'speed'? 1.1 : 1) * ( this.decreasedStat === 'speed'? 0.9 : 1 )
    }
  }
}
