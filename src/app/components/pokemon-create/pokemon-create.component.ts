import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../../../Mechanics/src/pokemon';
import {PokemonNature} from '../../../Mechanics/src/pokemonNature';
import {PokemonType} from '../../../Mechanics/src/PokemonType';
import {PokemonApiService} from '../../services/pokemon-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PokemonMove} from '../../../Mechanics/src/pokemonMove';

@Component({
  selector: 'app-pokemon-create',
  templateUrl: './pokemon-create.component.html',
  styleUrls: ['./pokemon-create.component.css']
})
export class PokemonCreateComponent implements OnInit {
  pokemonForm!: FormGroup;

  types: PokemonType[] = [];
  natures: PokemonNature[] = [];
  pokemonMoves: PokemonMove[] = [];

  @Input() pokemon: Pokemon;
  @Input() generation: string | undefined;

  constructor(private pokemonApiService: PokemonApiService,
              private formBuilder: FormBuilder,
              private router: Router) {
    let t = new PokemonType('', '', {});

    this.pokemon = new Pokemon(
      {
        name: 'test',
        pokemonName: 'Papilusion',
        type1: t,
        nature: new PokemonNature('', null, null),
        moves: [new PokemonMove("move1", 0, 0, 0, 0, this.types[0]),
          new PokemonMove("move2", 0, 0, 0, 0, this.types[0]),
          new PokemonMove("move3", 0, 0, 0, 0, this.types[0]),
          new PokemonMove("move4", 0, 0, 0, 0, this.types[0])],
        baseStat: {
          hp: 60,
          attack: 45,
          defense: 50,
          speAttack: 80,
          speDefense: 80,
          speed: 70
        },
      }
    );
  }

  setNature(nature: string) {
    let n = this.natures.find(value => value.name === nature);
    if (n) {
      this.pokemon.setNature(n);
    }
  }

  ngOnInit(): void {

    if (this.generation) {
      this.pokemonApiService.getAllPokemonTypeByGeneration(this.generation).subscribe(value => this.types = value);
    } else {
      this.pokemonApiService.getAllPokemonTypes().subscribe(value => {
        this.types = value;
        for(let i = 0; i<4; i++){
          this.pokemon.moves[i].type = this.types[0];
        }
      });
    }

    this.pokemonApiService.getAllPokemonNature().subscribe(value => {
      this.natures = value;
      if (this.pokemon.nature.name === '') {
        this.pokemon.setNature(this.natures[0]);
      }
    });

    this.pokemonForm = this.formBuilder.group({
      name: ['', Validators.required],
      nature: [this.pokemon.nature.name, Validators.required],
      type1: [this.pokemon.type1.name, Validators.required],
      level: [this.pokemon.level, [Validators.required, Validators.max(100), Validators.min(0)] ],
      type2: [this.pokemon.type2?.name]
    });
  }

  setPokemonLevel(l: string){
    console.log("set level: ", l);
    this.pokemon.setLevel( Number(l));
  }

  onSubmitForm() {
    const {name, nature, type1, type2} = this.pokemonForm.value;

    let n = this.types.find(value => value.name === type1);
    if (n) {
      this.pokemon.type1 = type1
    }

    if(type2) {
      let n = this.types.find(value => value.name === type2);
      if (n) {
        this.pokemon.type2 = type2
      }
    }else{
      this.pokemon.type2 = undefined
    }

    this.pokemonApiService.addNewPokemon(this.pokemon);

    console.log('new pokemon: \n', this.pokemon);

    this.router.navigate(['/select']);
  }

}
