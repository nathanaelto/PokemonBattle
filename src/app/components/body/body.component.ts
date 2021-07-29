import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../../../Mechanics/src/pokemon';
import {Log} from '../../../models/log';
import {BattleService} from 'src/app/services/battle.service';
import {PokemonApiService} from '../../services/pokemon-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {

  constructor(private battleService: BattleService,
              private pokemonApiService: PokemonApiService,
              private route: ActivatedRoute,
              private router: Router) {


  }

  pokemon1: Pokemon | undefined;
  pokemon2: Pokemon | undefined;

  logs: Log[] = [];

  label_play_pause = 'Start';
  play = false;

  firstStart = true;

  async ngOnInit() {
    let pn1 = this.route.snapshot.paramMap.get('idPokemon1');
    if (pn1 !== null) {
      this.pokemonApiService.getPokemonByName(pn1).subscribe(value => this.pokemon1 = value);
    }
    let pn2 = this.route.snapshot.paramMap.get('idPokemon2');
    if (pn2 !== null) {
      this.pokemonApiService.getPokemonByName(pn2).subscribe(value => this.pokemon2 = value);
    }
  }

  async launch() {
    if (this.firstStart) {
      this.play = true;
      this.firstStart = false;
      await this.startFight();
    } else {
      this.play = !this.play;
    }
  }

  async startFight() {
    if (!this.pokemon1 || !this.pokemon2) {
      return;
    }

    this.logs.push(new Log(undefined, undefined, 'Start', 0, undefined));
    // tslint:disable-next-line:variable-name
    this.battleService.init([this.pokemon1, this.pokemon2] );

    this.battleService.startTurn();
    while (!this.battleService.isOver()) {
      while (!this.play) {
        await this.delay(1000);
      }
      this.logs.push(this.battleService.stepTurn());
      await this.delay(1000);
    }
    if (this.pokemon1?.isDead()) {
      this.router.navigate(['/winner/'+this.pokemon2?.pokemonName])
    } else {
      this.router.navigate(['/winner/'+this.pokemon1?.pokemonName])
    }
  }

  // tslint:disable-next-line:typedef
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
