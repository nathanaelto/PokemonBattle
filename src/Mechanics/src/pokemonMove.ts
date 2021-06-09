import { PokemonType} from "./PokemonType";

/*
export async function getMoveFromApi(name: string){
    let data = await P.getMoveByName(name);
    return new PokemonMove(name, data.accuracy, data.power, data.pp, data.priority, await getPokemonType(data.type.name))
}
*/

export class PokemonMove {

    name: string;
    accuracy: number;
    power: number;
    pp: number;
    priority: number;
    type: PokemonType;

    constructor(name: string, accuracy: number, power: number, pp: number, priority: number, type: PokemonType) {
        this.name = name;
        this.accuracy = accuracy;
        this.power = power;
        this.pp = pp;
        this.priority = priority;
        this.type = type;
    }

}
