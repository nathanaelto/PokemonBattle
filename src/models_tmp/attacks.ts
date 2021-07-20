import {Attack} from './attack';

export class Attacks {
    attacks: Attack[];

    constructor(attacks: Attack[]) {
        this.attacks = attacks;
    }

    addAttack(attack: Attack){
        this.attacks.push(attack);
    }

}
