import { Component, OnInit } from '@angular/core';
import {PokemonWithImg} from '../../../models/pokemonWithImg';
import {PokemonApi, PokemonApiService} from '../../services/pokemon-api.service';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {NavigationEnd, NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-choose-pokemon',
  templateUrl: './choose-pokemon.component.html',
  styleUrls: ['./choose-pokemon.component.css']
})
export class ChoosePokemonComponent implements OnInit {

  showOverlay = true;

  pokemonList: Array<PokemonWithImg> = [];
  count: number = 0;

  constructor(private pokemonApiService: PokemonApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.pokemonApiService.getAllPokemon().pipe(
      tap(x => {
        this.count = x.results.length;
      }),
      mergeMap((value) => {
        return forkJoin(
          value.results.map(
            value1 => {
              return this.pokemonApiService.getPokemonByName(value1.name)
            }
          )
        )
      }),
    ).subscribe(value => {
      this.pokemonList = value.map(data => {
        return {
          name: data.name,
          imgLink: data.sprites.front_default
        }
      });
      this.showOverlay = false;
    });
  }

  navigationLoadInterceptor(event: RouterEvent) {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }
  }

}
