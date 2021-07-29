import {Component, Input, OnInit} from '@angular/core';
import {PokemonMove} from '../../../Mechanics/src/pokemonMove';

@Component({
  selector: 'app-pokemon-move-display',
  templateUrl: './pokemon-move-display.component.html',
  styleUrls: ['./pokemon-move-display.component.css']
})
export class PokemonMoveDisplayComponent implements OnInit {

  @Input() pokemonMove: PokemonMove | undefined;
  constructor() { }

  ngOnInit(): void {
  }



}
