import {PokemonNature, pokemonNatureToStat} from "../src/pokemonNature";
import {PokemonStat} from "../src/pokemon";


describe("pokemon Nature", function (){

    it( "nature normal should not change stat", function (){
        const nature = new PokemonNature("normal", null, null);
        const stat = pokemonNatureToStat(nature);

        const expected: PokemonStat = {
            hp:1,
            attack: 1,
            defense: 1,
            speAttack: 1,
            speDefense: 1,
            speed: 1
        }

        expect( stat).toStrictEqual(expected);
    });

    it( "should increase spe-attack ad reduce spe-defense", function (){
        const nature = new PokemonNature("", "special-defense", "special-attack");
        const stat = pokemonNatureToStat(nature);

        const expected: PokemonStat = {
            hp:1,
            attack: 1,
            defense: 1,
            speAttack: 1.1,
            speDefense: 0.9,
            speed: 1
        }

        expect( stat).toStrictEqual(expected);
    });

    it( "should increase speed ad reduce hp", function (){
        const nature = new PokemonNature("", "hp", "speed");
        const stat = pokemonNatureToStat(nature);

        const expected: PokemonStat = {
            hp:0.9,
            attack: 1,
            defense: 1,
            speAttack: 1,
            speDefense: 1,
            speed: 1.1
        }

        expect( stat).toStrictEqual(expected);
    });


});
