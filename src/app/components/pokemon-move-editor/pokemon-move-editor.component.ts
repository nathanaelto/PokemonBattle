import {Component, Input, OnInit} from '@angular/core';
import {PokemonMove} from '../../../Mechanics/src/pokemonMove';
import {PokemonType} from '../../../Mechanics/src/PokemonType';
import {PokemonApiService} from '../../services/pokemon-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pokemon-move-editor',
  templateUrl: './pokemon-move-editor.component.html',
  styleUrls: ['./pokemon-move-editor.component.css']
})
export class PokemonMoveEditorComponent implements OnInit {

  moveForm!: FormGroup;
  types: PokemonType[] = [];

  @Input() move: PokemonMove | undefined;
  constructor(private pokemonApiService: PokemonApiService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.pokemonApiService.getAllPokemonTypes().subscribe(value =>{
      this.types = value

      this.moveForm = this.formBuilder.group({
        name: [this.move?.name, Validators.required],
        accuracy: [this.move?.accuracy, Validators.required],
        power: [this.move?.power, Validators.required],
        priority: [this.move?.priority, Validators.required],
        type: [this.move?.type?.name, Validators.required],
      });

      this.moveForm.valueChanges.subscribe(value => {
        const {name, accuracy, power, priority, type} = value;
        if(this.move){
          this.move.name = name;
          this.move.accuracy = accuracy;
          this.move.power = power;
          this.move.priority = priority;
          let t = this.types.find(value1 => value1.name === type)
          if(t) {
            this.move.type = t
          }
        }
      });

    });

  }

}
