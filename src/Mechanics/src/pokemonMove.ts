import { PokemonType} from "./PokemonType";

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
