import {Component, Input, OnInit} from '@angular/core';
import {Pokemon, PokemonStat} from '../../../Mechanics/src/pokemon';

@Component({
  selector: 'app-pokemon-stats-display',
  templateUrl: './pokemon-stats-display.component.html',
  styleUrls: ['./pokemon-stats-display.component.css']
})
export class PokemonStatsDisplayComponent implements OnInit {
  @Input() stats: PokemonStat | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
