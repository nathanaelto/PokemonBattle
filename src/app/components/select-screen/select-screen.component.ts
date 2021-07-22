import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PokemonWithImg} from "../../../models/pokemonWithImg";
import {Pokemon} from "../../../Mechanics/src/pokemon";

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
  pokelist: PokemonWithImg[] = [];
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              //TODO give the API POKEMON
              ) {


    this.showImg1 = false;
    this.showImg2 = false;
    this.linkImg1 = "";
    this.linkImg2 = "";
  }

  ngOnInit(): void {
    this.initForm()
    this.pokelist.push(new PokemonWithImg("poke1","https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"))
    this.pokelist.push(new PokemonWithImg("poke2","https://secure.img1-ag.wfcdn.com/im/02238154/compr-r85/8470/84707680/pokemon-pikachu-wall-decal.jpg"))
    this.pokelist.push(new PokemonWithImg("poke3","https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp/220px-Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp.png"))
    this.pokelist.push(new PokemonWithImg("poke4","https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg"))
  }

  initForm(){
    this.pokemonForm = this.formBuilder.group({
      idPokemon1: ['', Validators.required],
      idPokemon2: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.pokemonForm?.value;
    this.router.navigate(['/fight/'+formValue['idPokemon1']+'/'+formValue['idPokemon2']]);
  }

  callType1(value: string) {
    this.showImg1 = true;
    this.linkImg1 = this.pokelist.filter((poke)=>{
      return poke.name === value;
    }).pop()?.imgLink
  }

  callType2(value: string) {
    this.showImg2 = true;
    this.linkImg2 = this.pokelist.filter((poke)=>{
      return poke.name === value;
    }).pop()?.imgLink
  }
}
