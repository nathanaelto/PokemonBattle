import { Component, OnInit } from '@angular/core';
import {Pokemon} from "../../../Mechanics/src/pokemon";
import {PokemonApiService} from "../../services/pokemon-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-winner-screen',
  templateUrl: './winner-screen.component.html',
  styleUrls: ['./winner-screen.component.css']
})
export class WinnerScreenComponent implements OnInit {

  pokemon: Pokemon | undefined;

  constructor(private pokemonApiService: PokemonApiService,
              private route: ActivatedRoute) { }

  async ngOnInit() {
    let pn1 = this.route.snapshot.paramMap.get('idPokemon');
    if (pn1 !== null) {
      this.pokemonApiService.getPokemonByName(pn1).subscribe(value => this.pokemon = value);
    }
  }

}
