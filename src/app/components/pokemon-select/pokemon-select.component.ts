import {Component, Input, OnInit} from '@angular/core';
import {PokemonWithImg} from "../../../models/pokemonWithImg";

@Component({
  selector: 'app-pokemon-select',
  templateUrl: './pokemon-select.component.html',
  styleUrls: ['./pokemon-select.component.css']
})
export class PokemonSelectComponent implements OnInit {

  @Input() pokemonsWithImg: PokemonWithImg[] | undefined;
  @Input() labelId: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
