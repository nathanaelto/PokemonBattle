import {Directive, HostBinding, Input} from '@angular/core';
import {Log} from '../../models/log';
import {colors} from '@angular/cli/utilities/color';

@Directive({
  selector: '[appLogPokemon]'
})
export class LogPokemonDirective {

  @HostBinding('style.color') color = 'black';

  @Input() appLogPokemon: Log | undefined ;
  constructor() {}

  ngInit() {
    console.log('color');
    if (this.appLogPokemon?.pid === 1){
       this.color = 'bleu';
    }else{
      this.color = 'red';
    }
  }

}
