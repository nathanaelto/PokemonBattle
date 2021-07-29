import {Pokemon} from '../Mechanics/src/pokemon';
import {PokemonMove} from '../Mechanics/src/pokemonMove';

export class Log {

  pokemon?: Pokemon;
  attack?: PokemonMove;
  log: string;
  type: number;
  pid?: number;

  constructor(pokemon: Pokemon |undefined, attack: PokemonMove|undefined, log: string, type: number, pid: number |undefined) {
    this.pokemon = pokemon;
    this.attack = attack;
    this.log = log;
    this.type = type;
    this.pid = pid;
  }

  /*
  Type :
  0 : start
  1 : attack
  2 : win

   */
}
