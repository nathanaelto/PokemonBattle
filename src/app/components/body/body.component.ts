import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../../../Mechanics/src/pokemon';
import {Log} from '../../../models/log';
import {PokemonType} from '../../../Mechanics/src/PokemonType';
import {PokemonNature} from '../../../Mechanics/src/pokemonNature';
import {PokemonMove} from '../../../Mechanics/src/pokemonMove';
import {Battle} from '../../../Mechanics/src/battle';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {

  constructor( private battleService : BattleService) {
    let type = new PokemonType("default", "none",{} );

    let move = new PokemonMove("lance bite", 100, 50, 15, 1, type);
    let move2 = new PokemonMove("lance cul", 10, 200, 15, 15, type);

    this.pokemon1 =  new Pokemon(
      {
        name: "papi",
        pokemonName: "Papilusion",
        level: 50,
        type1: type,
        nature: new PokemonNature("null", null, null),
        moves:[move, move2],
        baseStat: {
          hp: 60,
          attack: 45,
          defense: 50,
          speAttack: 80,
          speDefense: 80,
          speed: 70
        },
        individualStat: {
          hp: 28,
          attack: 4,
          defense: 17,
          speAttack: 30,
          speDefense: 27,
          speed: 31
        },
        effortStat: {
          hp: 1,
          attack: 0,
          defense: 0,
          speAttack: 63,
          speDefense: 0,
          speed: 63
        },
        natureStat: {
          hp: 1,
          attack: 0.9,
          defense: 1,
          speAttack: 1.1,
          speDefense: 1,
          speed: 1
        }
      }
    );

    this.pokemon2 =  new Pokemon(
      {
        name: "papi 2",
        pokemonName: "Papilusion",
        level: 50,
        type1: type,
        nature: new PokemonNature("null", null, null),
        moves:[move, move2],
        baseStat: {
          hp: 60,
          attack: 45,
          defense: 50,
          speAttack: 80,
          speDefense: 80,
          speed: 70
        },
        individualStat: {
          hp: 28,
          attack: 4,
          defense: 17,
          speAttack: 30,
          speDefense: 27,
          speed: 31
        },
        effortStat: {
          hp: 1,
          attack: 0,
          defense: 0,
          speAttack: 63,
          speDefense: 0,
          speed: 63
        },
        natureStat: {
          hp: 1,
          attack: 0.9,
          defense: 1,
          speAttack: 1.1,
          speDefense: 1,
          speed: 1
        }
      }
    );
  }

  pokemon1: Pokemon;
  pokemon2: Pokemon;
  // tslint:disable-next-line:ban-types
  logs: Log[] = [];
  // tslint:disable-next-line:variable-name
  label_play_pause = 'Start';
  play = false;

  firstStart = true;

  isDead(p: Pokemon): boolean{
    return p.isDead();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async launch(){
    if (this.firstStart){
      this.play = true;
      this.firstStart = false;
      await this.startFight();
    } else {
      this.play = !this.play;
    }
  }


  // tslint:disable-next-line:typedef
  async startFight() {
    this.logs.push( new Log(undefined, undefined, 'Start', 0, undefined));
    // tslint:disable-next-line:variable-name
    let battle = new Battle();
    this.battleService.init([this.pokemon1, this.pokemon2] );

    this.battleService.startTurn();
    while(!this.battleService.isOver()){
      this.logs.push( this.battleService.stepTurn());
      await this.delay(1000);
    }

  }

  // tslint:disable-next-line:typedef
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
