import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../../../models/pokemon';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.css']
})
export class PokemonDisplayComponent implements OnInit {

  @Input() pokemon: Pokemon | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
