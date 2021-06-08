import {PokemonType} from "../src/PokemonType";

describe( "pokemon type damage multiplier", function (){

    it( "should be 2", function (){
        const attackerType = new PokemonType("water", "spe", {doubleDamageTo: ["fire"]});
        const defenderType1 = new PokemonType("fire", "spe", {doubleDamageFrom:["water"]});

        expect( attackerType.getDamageMultiplier(defenderType1)).toBe(2);

    });

    it( "should be 0.5", function (){
        const attackerType = new PokemonType("water", "spe", {halfDamageTo: ["fire"]});
        const defenderType1 = new PokemonType("fire", "spe", {halfDamageTo:["water"]});

        expect( attackerType.getDamageMultiplier(defenderType1)).toBe(0.5);
    });

    it( "should be 0", function (){
        const attackerType = new PokemonType("water", "spe", {noDamageTo: ["fire"]});
        const defenderType1 = new PokemonType("fire", "spe", {noDamageFrom:["water"]});

        expect( attackerType.getDamageMultiplier(defenderType1)).toBe(0);
    });

    it( "should be 1 no damage relation", function (){
        const attackerType = new PokemonType("water", "spe", {});
        const defenderType1 = new PokemonType("fire", "spe", {});

        expect( attackerType.getDamageMultiplier(defenderType1)).toBe(1);
    });

    it( "should be 1 damage relation cancelled", function (){
        const attackerType = new PokemonType("water", "spe", {doubleDamageTo:["fire"], halfDamageTo:["fire2"]});
        const defenderType1 = new PokemonType("fire", "spe", {});
        const defenderType2 = new PokemonType("fire2", "spe", {});

        expect( attackerType.getDamageMultiplier(defenderType1, defenderType2)).toBe(1);
    });

    it( "should be 4 ", function (){
        const attackerType = new PokemonType("water", "spe", {doubleDamageTo:["fire", "fire2"]});
        const defenderType1 = new PokemonType("fire", "spe", {});
        const defenderType2 = new PokemonType("fire2", "spe", {});

        expect( attackerType.getDamageMultiplier(defenderType1, defenderType2)).toBe(4);
    });

    it( "should be 0.25 ", function (){
        const attackerType = new PokemonType("water", "spe", {halfDamageTo:["fire", "fire2"]});
        const defenderType1 = new PokemonType("fire", "spe", {});
        const defenderType2 = new PokemonType("fire2", "spe", {});

        expect( attackerType.getDamageMultiplier(defenderType1, defenderType2)).toBe(0.25);
    });


});
