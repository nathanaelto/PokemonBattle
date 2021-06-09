import {PokemonStat} from "./pokemon";
import {HttpClient} from '@angular/common/http';
import {pokemonApiUrl} from '../index';

export class PokemonNature{
    name: string;
    decreasedStat: string | null;
    increasedStat: string | null;

    constructor(name: string, decreasedStat: string | null, increasedStat: string |null) {
        this.name = name;
        this.decreasedStat = decreasedStat;
        this.increasedStat = increasedStat;
    }
}

let natureList: Array<PokemonNature> | null = null;

export function pokemonNatureToStat(nature: PokemonNature): PokemonStat{
    return {
        hp: (nature.increasedStat === 'hp'? 1.1 : 1) * ( nature.decreasedStat === 'hp'? 0.9 : 1 ),
        attack: (nature.increasedStat === 'attack'? 1.1 : 1) * ( nature.decreasedStat === 'attack'? 0.9 : 1 ),
        defense: (nature.increasedStat === 'defense'? 1.1 : 1) * ( nature.decreasedStat === 'defense'? 0.9 : 1 ),
        speAttack: (nature.increasedStat === 'special-attack'? 1.1 : 1) * ( nature.decreasedStat === 'special-attack'? 0.9 : 1 ),
        speDefense: (nature.increasedStat === 'special-defense'? 1.1 : 1) * ( nature.decreasedStat === 'special-defense'? 0.9 : 1 ),
        speed: (nature.increasedStat === 'speed'? 1.1 : 1) * ( nature.decreasedStat === 'speed'? 0.9 : 1 )
    }
}

/*
async function loadAllNature(http: HttpClient){
    if ( natureList === null){
        const list = await http.get<any>(pokemonApiUrl+'nature');

        natureList = new Array<PokemonNature>();
        for (let i = 0; i < list.count ; i++) {
            const data = await P.getNatureByName( list.results[i].name );
            natureList.push( new PokemonNature( list.results[i].name, data.decreased_stat?.name, data.increased_stat?.name));
        }
    }

    return natureList;
}

export async function getNature(name: string){
    if ( natureList === null) {
        natureList = await loadAllNature();
    }
    const nature: PokemonNature | undefined = natureList.find( nature => nature.name === name);
    if( nature === undefined){
        throw new Error(" Unknown pokemon nature: "+name);
    }else{
        return nature;
    }
}

export async function getRandomNature(): Promise<PokemonNature>{
    if ( natureList === null) {
        natureList = await loadAllNature();
    }
    return natureList[ Math.floor( Math.random() * natureList.length ) ];
}

 */

