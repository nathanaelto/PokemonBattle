import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PokemonWithImg} from "../../../models/pokemonWithImg";

@Component({
  selector: 'app-select-screen',
  templateUrl: './select-screen.component.html',
  styleUrls: ['./select-screen.component.css']
})
export class SelectScreenComponent implements OnInit {

  pokemonForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              //TODO give the API POKEMON
              ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.pokemonForm = this.formBuilder.group({
      idPokemon1: this.formBuilder.array([]),
      idPokemon2: this.formBuilder.array([])
    });
  }

  getPokemonsName() : PokemonWithImg[]{
    //TODO ajouter l'appel au service API pokemon
    let pokelist: PokemonWithImg[] = [];
    pokelist.push(new PokemonWithImg("poke1","string"))
    pokelist.push(new PokemonWithImg("poke2","string"))
    pokelist.push(new PokemonWithImg("poke3","string"))
    pokelist.push(new PokemonWithImg("poke4","string"))
    return pokelist
  }

  onSubmitForm() {
    const formValue = this.pokemonForm?.value;
    this.router.navigate(['/fight/'+formValue['idPokemon1']+'/'+formValue['idPokemon2']]);
  }

}
