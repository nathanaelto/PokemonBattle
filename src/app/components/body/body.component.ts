import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../../../models/pokemon';
import {Attacks} from '../../../models/attacks';
import {whoAttackFirst} from '../../../controllers/fight';
import {Log} from '../../../models/log';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {

  constructor() {
    this.pokemon1 = new Pokemon(
      'Pikachu',
      90,
      100,
      new Attacks([
        { name: 'Queu de fer', damage: 10 },
        { name: 'Eclair', damage: 30 },
        { name: 'Vive attaque', damage: 25},
        { name: 'Coup d\'Jus', damage: 15}
      ])
    );

    this.pokemon2 = new Pokemon(
      'Carapuce',
      75,
      150,
      new Attacks([
        { name: 'Canon a eau', damage: 35},
        { name: 'Coup de boul', damage: 5},
        { name: 'Vibraqua', damage: 20},
        { name: 'Hydroqueue', damage: 10}
      ])
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
    return p.hp === 0;
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
    const pokemon_start = whoAttackFirst(this.pokemon1, this.pokemon2);
    // tslint:disable-next-line:variable-name
    let pokemon_second: Pokemon;
    if (pokemon_start === this.pokemon1) {
      pokemon_second = this.pokemon2;
    } else {
      pokemon_second = this.pokemon1;
    }

    let turn = 0;
    while (true) {
      // console.log(this.pokemon1.hp);

      if (this.play){
        let attack;
        if (turn % 2 === 0) {
          attack = pokemon_start.chooseAttack();
          await this.attack(pokemon_start, pokemon_second, attack);
          this.logs.push(
            new Log(
              pokemon_start.name,
              pokemon_start.attacks.attacks[attack].name,
              this.logAttack(pokemon_start, attack),
              1,
              1
            )
          );
          if (this.isDead(pokemon_second)) {
            // return pokemon_start;
            this.logs.push( new Log(
              pokemon_start.name,
              undefined,
              `${pokemon_start.name} WIN`,
              2,
              1
            ));
            break;
          }

        } else {
          attack = pokemon_second.chooseAttack();
          await this.attack(pokemon_second, pokemon_start, attack);
          this.logs.push(
            new Log(
              pokemon_second.name,
              pokemon_second.attacks.attacks[attack].name,
              this.logAttack(pokemon_second, attack),
              1,
              2
            )
          );
          if (this.isDead(pokemon_start)) {
            // return pokemon_second;
            this.logs.push( new Log(
              pokemon_start.name,
              undefined,
              `${pokemon_second.name} WIN`,
              2,
              2
            ));
            break;
          }
        }
        // this.logFightStatus(pokemon_start, pokemon_second);
        turn += 1;
      } else {
        await this.delay(2000);
      }
    }
  }

  // tslint:disable-next-line:typedef
  private attack(attacker: Pokemon, target: Pokemon, attack: number){
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve(attacker.useAttackIdTo(attack, target));
      }, 2000);
    });
  }

  // tslint:disable-next-line:typedef ban-types
  logAttack(attacker: Pokemon, attackId: number): string{
    const attack = attacker.attacks.attacks[attackId];
    return `${attacker.name} use ${attack.name} (${attack.damage})`;
  }

  // tslint:disable-next-line:typedef
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
