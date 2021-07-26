import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pokemon} from '../../../Mechanics/src/pokemon';
import {PokemonApiService} from '../../services/pokemon-api.service';

@Component({
  selector: 'app-select-screen',
  templateUrl: './select-screen.component.html',
  styleUrls: ['./select-screen.component.css']
})
export class SelectScreenComponent implements OnInit {

  @Input() poke: Pokemon | undefined;
  @Input() poke2: Pokemon | undefined;
  pokemonForm!: FormGroup;
  showImg1: boolean;
  linkImg1: string | undefined;
  showImg2: boolean;
  linkImg2: string | undefined;
  pokelist: Pokemon[] = [];
  generationList: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private pokemonApi: PokemonApiService
              //TODO give the API POKEMON
  ) {

    this.showImg1 = false;
    this.showImg2 = false;
    this.linkImg1 = '';
    this.linkImg2 = '';
  }

  async ngOnInit(): Promise<void> {

    console.log(this.pokemonApi.getAllTypeDetails());

    this.initForm();
    this.generationList = await  this.pokemonApi.getAllGenerationNames();

    //this.pokelist = await this.pokemonApi.getAllPokemons();

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
    this.pokelist = await this.pokemonApi.getAllPokemonByGeneration(generationName);
    console.log("selectGeneration ended");
  }

  callType1(value: string) {
    this.showImg1 = true;
    this.poke = this.pokelist.filter((poke) => {
      return poke.pokemonName === value;
    }).pop();
    this.linkImg1 = this.poke?.imageLink;
  }

  callType2(value: string) {
    this.showImg2 = true;
    this.poke2 = this.pokelist.filter((poke) => {
      return poke.pokemonName === value;
    }).pop();
    this.linkImg2 = this.poke2?.imageLink;
  }
}
