import { Injectable } from '@angular/core';
import {Battle} from '../../Mechanics/src/battle';
import {Log} from '../../models/log';
import {Pokemon} from '../../Mechanics/src/pokemon';

@Injectable()
export class BattleService {

  battle: Battle

  constructor() {
    this.battle = new Battle();
  }

  init(pokes : Array<Pokemon>): void{
    this.battle = new Battle();
    this.battle.initBattle(pokes);
  }

  startTurn(): void{
    this.battle.prepareNextTurn();
  }

  isOver(): boolean{
    return this.battle.isFightOver();
  }

  stepTurn(): Log{
    let pokemonBattleMove = this.battle.getNextPokemonAction();
    let pokemonToPlay = pokemonBattleMove.pokemon;
    let damage;

    for (let i = 0; i < pokemonBattleMove.targets.length; i++) {

      const target = pokemonBattleMove.targets[i];
      if(pokemonToPlay.doesItHit(pokemonBattleMove.move, target)){
        damage = pokemonToPlay.attack(pokemonBattleMove.move, target);

        if( target.isDead() ){
          this.battle.pokemons = this.battle.pokemons.filter(function (curr){
            return curr.pokemon !== target;
          });
        }
      }else{
        return new Log(
          pokemonToPlay,
          pokemonBattleMove.move,
          " ( missed )",
          1,
          pokemonBattleMove.teams +1
        )
      }

    }


    return new Log(
      pokemonToPlay,
      pokemonBattleMove.move,
      " ("+damage+")",
      1,
      pokemonBattleMove.teams +1
    )

  }


}
