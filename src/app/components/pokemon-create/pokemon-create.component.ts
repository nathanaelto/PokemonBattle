import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../../../Mechanics/src/pokemon';
import {PokemonNature} from '../../../Mechanics/src/pokemonNature';
import {PokemonType} from '../../../Mechanics/src/PokemonType';

@Component({
  selector: 'app-pokemon-create',
  templateUrl: './pokemon-create.component.html',
  styleUrls: ['./pokemon-create.component.css']
})
export class PokemonCreateComponent implements OnInit {

  @Input() pokemon: Pokemon;
  constructor() {
    this.pokemon = new Pokemon(
      {
        name: "papi",
        pokemonName: "Papilusion",
        level: 50,
        type1: new PokemonType("", "",{}),
        nature: new PokemonNature("null", null, null),
        moves:[],
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

  ngOnInit(): void {
  }

}
