import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PokemonApiService, PokemonImg} from '../../services/pokemon-api.service';

@Component({
  selector: 'app-select-screen',
  templateUrl: './select-screen.component.html',
  styleUrls: ['./select-screen.component.css']
})
export class SelectScreenComponent implements OnInit {

  poke: PokemonImg | undefined;
  poke2: PokemonImg | undefined;

  pokemonForm!: FormGroup;

  pokelist: PokemonImg[] = [];
  generationList: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private pokemonApi: PokemonApiService
              //TODO give the API POKEMON
  ) {


  }

  async ngOnInit(): Promise<void> {

    console.log(this.pokemonApi.getAllTypeDetails());

    this.initForm();
    this.generationList = await  this.pokemonApi.getAllGenerationNames();

    this.pokemonApi.getAllGeneration().subscribe(value => this.generationList = value);

    console.log(this.pokelist);
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
    this.router.navigate(['/crate']);
  }

  onCreatePokemon2() {
    this.router.navigate(['/crate']);
  }

  async selectGeneration(generationName: string) {
    //this.pokelist = await this.pokemonApi.getAllPokemonByGeneration(generationName);

    this.pokemonApi.getAllPokemonByGeneration(generationName).subscribe(value => this.pokelist = value);
    console.log("selectGeneration ended");
  }

  callType1(value: string) {
    this.poke = this.pokelist.filter((poke) => {
      return poke.name === value;
    }).pop();
  }

  callType2(value: string) {
    this.poke2 = this.pokelist.filter((poke) => {
      return poke.name === value;
    }).pop();
  }
}
