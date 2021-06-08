import {Pokemon} from "../models/pokemon";

export function whoAttackFirst(p1: Pokemon, p2: Pokemon): Pokemon{
    return p1.speed > p2.speed ? p1 : p2;
}
