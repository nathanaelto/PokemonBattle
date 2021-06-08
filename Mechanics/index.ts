import {  Pokemon} from "./src/pokemon";
import {Battle} from "./src/battle";
import { PokemonType} from "./src/PokemonType";
import {  PokemonNature} from "./src/pokemonNature";
import {PokemonMove} from "./src/pokemonMove";

const type1 = new PokemonType("type1", "attack", {} );

const move1 = new PokemonMove("lance banane", 100, 70, 20, 0, type1);

const p1: Pokemon = new Pokemon( {
    name: "pika1",
    pokemonName: "pikachu",
    type1: new PokemonType("default", "none",{} ),
    nature: new PokemonNature("null", null, null),
    level: 90,
    baseStat: {
        hp: 60,
        attack: 45,
        defense: 50,
        speAttack: 80,
        speDefense: 80,
        speed: 70
    },
    individualStat:{
        hp: 15,
        attack: 15,
        defense: 15,
        speAttack: 15,
        speDefense: 15,
        speed: 15
    }
});
p1.addMove(move1);

const p2: Pokemon = new Pokemon( {
    name: "pika2",
    pokemonName: "pikachu",
    type1: new PokemonType("default", "none",{} ),
    nature: new PokemonNature("null", null, null),
    level: 100,
    baseStat: {
        hp: 60,
        attack: 45,
        defense: 50,
        speAttack: 80,
        speDefense: 80,
        speed: 70
    },
    individualStat:{
        hp: 15,
        attack: 15,
        defense: 15,
        speAttack: 15,
        speDefense: 15,
        speed: 15
    }
});
p2.addMove(move1);

const battle = new Battle();
battle.initBattle( [p1, p2]);

test();

async function test() {
    await battle.doFight();
}


