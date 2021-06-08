import {Pokemon} from './pokemon';
import {whoAttackFirst} from '../controllers/fight';

export interface FightProps {
    p1: Pokemon;
    p2: Pokemon;
}

export class Fight{

    constructor(props: FightProps) {
        this.p1 = props.p1;
        this.p2 = props.p2;
    }

    p1: Pokemon;
    p2: Pokemon;
  // tslint:disable-next-line:ban-types
    log: String[] = [];

    private static isDead(p: Pokemon): boolean{
        return p.hp === 0;
    }

    public async fight(): Promise<Pokemon>{
      // tslint:disable-next-line:variable-name
        const pokemon_start = whoAttackFirst(this.p1, this.p2);
      // tslint:disable-next-line:variable-name
        let pokemon_second: Pokemon;
        if (pokemon_start === this.p1){
            pokemon_second = this.p2;
        } else {
            pokemon_second = this.p1;
        }

        let turn = 0;
        while (true){
            let attack;
            if (turn % 2 === 0){
                attack = pokemon_start.chooseAttack();
                await this.attack(pokemon_start, pokemon_second, attack);
                // this.logAttack(pokemon_start, attack);
                if (Fight.isDead(pokemon_second)){
                    return pokemon_start;
                }
            } else {
                attack = pokemon_second.chooseAttack();
                await this.attack(pokemon_second, pokemon_start, attack);
                // this.logAttack(pokemon_second, attack);
                if (Fight.isDead(pokemon_start)){
                    return pokemon_second;
                }
            }
            // this.logFightStatus(pokemon_start, pokemon_second);
            turn += 1;
        }
    }

  // tslint:disable-next-line:typedef
    private attack(attacker: Pokemon, target: Pokemon, attack: number){
        return new Promise<void>(resolve => {
            setTimeout(() => {
                resolve(attacker.useAttackIdTo(attack, target));
            }, 1000);
        });
    }

  // tslint:disable-next-line:typedef
    logAttack(attacker: Pokemon, attackId: number){
        const attack = attacker.attacks.attacks[attackId];
        console.log(`${attacker.name} use ${attack.name} (${attack.damage})`)
    }

  // tslint:disable-next-line:typedef
    logFightStatus(p1: Pokemon, p2: Pokemon){
        console.log(`${p1.name} - ${p1.hp} || ${p2.name} - ${p2.hp}`);
    }


}
