import {Attacks} from './attacks';
import {getRandom} from '../controllers/utils';

export interface PokemonProps {
    name: string;
    speed: number;
    hp: number;
    attacks: Attacks;
}

export class Pokemon {
    name: string;
    speed: number;
    hp: number;
    attacks: Attacks;

    constructor(name: string, speed: number, hp: number, attacks: Attacks) {
        this.name = name;
        this.speed = speed;
        this.hp = hp;
        this.attacks = attacks;
    }

  // tslint:disable-next-line:typedef
    useAttackIdTo(id: number, other: Pokemon){
        const dmg: number | undefined = this.attacks?.attacks[id].damage;
        if (dmg !== undefined){
            if (other.hp <= dmg){
                other.hp = 0;
            } else {
                other.hp -= dmg;
            }
        }
    }

    chooseAttack(): number{
        return getRandom(this.attacks.attacks.length);
    }

}
