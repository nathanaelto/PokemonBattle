import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PokemonApiService, PokemonImg} from '../../services/pokemon-api.service';
import {Pokemon} from '../../../Mechanics/src/pokemon';

@Component({
  selector: 'app-select-screen',
  templateUrl: './select-screen.component.html',
  styleUrls: ['./select-screen.component.css']
})
export class SelectScreenComponent implements OnInit {

  poke1: PokemonImg | undefined;
  poke2: PokemonImg | undefined;

  pokemonForm!: FormGroup;
  generation: string | undefined;

  pokemonCreator1: boolean = false;
  pokemonCreator2: boolean = false;

  pokeList: PokemonImg[] = [];
  createdPokeList: Pokemon[] = [];
  generationList: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private pokemonApi: PokemonApiService
              //TODO give the API POKEMON
  ) {


  }

  async ngOnInit(): Promise<void> {
    this.initForm();
    this.pokemonApi.getAllGeneration().subscribe(value => this.generationList = value);

    this.createdPokeList = this.pokemonApi.getCreatedPokemon();

  }

  initForm() {

    this.pokemonForm = this.formBuilder.group({
      idPokemon1: ['', Validators.required],
      idPokemon2: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.pokemonForm?.value;
    this.router.navigate(['/fight/' + formValue['idPokemon1'] + '/' + formValue['idPokemon2']]);
  }

  onCreatePokemon1() {
    this.router.navigate(['/create']);
  }

  onCreatePokemon2() {
    this.router.navigate(['/create']);
  }

  async selectGeneration(generationName: string) {
    this.pokeList = [];
    this.poke1 = undefined;
    this.poke2 = undefined;
    this.generation = generationName;
    this.pokemonApi.getAllPokemonByGeneration(generationName).subscribe(value => this.pokeList = value);
  }

  callType1(value: string) {
    this.poke1 = this.pokeList.filter((poke) => {
      return poke.name === value;
    }).pop();
  }

  callType2(value: string) {
    this.poke2 = this.pokeList.filter((poke) => {
      return poke.name === value;
    }).pop();
  }
}
