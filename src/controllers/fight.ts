import {Pokemon} from "../Mechanics/src/pokemon";
import {Battle} from '../Mechanics/src/battle';


export function whoAttackFirst(battle:Battle): Pokemon{
    return battle.getNextPokemonToMove();
}
