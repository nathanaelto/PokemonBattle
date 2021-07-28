import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {PokemonStat} from '../../../Mechanics/src/pokemon';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-pokemon-stats-editor',
  templateUrl: './pokemon-stats-editor.component.html',
  styleUrls: ['./pokemon-stats-editor.component.css']
})


export class PokemonStatsEditorComponent implements OnInit, OnChanges {

  statForm!: FormGroup;

  @Input() stat: PokemonStat | undefined;
  @Input() min: number = 0;
  @Input() max: number = 255;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.statForm = this.formBuilder.group({
      hp: [this.stat?.hp, Validators.required],
      attack: [this.stat?.attack, Validators.required],
      defense: [this.stat?.defense, Validators.required],
      speAttack: [this.stat?.speAttack, Validators.required],
      speDefense: [this.stat?.speDefense, Validators.required],
      speed: [this.stat?.speed, Validators.required]
    });

    this.statForm.valueChanges.subscribe(value => {
      const {hp, attack, defense, speAttack, speDefense, speed} = value;
      if(this.stat){
        this.stat.hp = hp;
        this.stat.attack = attack;
        this.stat.defense = defense;
        this.stat.speDefense = speDefense;
        this.stat.speAttack = speAttack;
        this.stat.speed = speed;
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.stat = changes.stat.currentValue;
    if(this.statForm && this.stat)
      this.statForm.setValue({
        hp: this.stat.hp,
        attack: this.stat.attack,
        defense: this.stat.defense,
        speDefense: this.stat.speDefense,
        speAttack: this.stat.speAttack,
        speed: this.stat.speed
      });
  }

}
