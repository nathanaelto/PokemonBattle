import {Pokemon} from "../src/pokemon";
import {PokemonNature} from "../src/pokemonNature";
import {PokemonType} from "../src/PokemonType";
import {PokemonMove} from "../src/pokemonMove";

describe( "pokemonBase stats", function (){

    it("pokemonBase stats", function (){
        const base: Pokemon = new Pokemon(
            {
                name: "papi",
                pokemonName: "Papilusion",
                type1: new PokemonType("default", "none",{} ),
                nature: new PokemonNature("null", null, null),
                baseStat: {
                    hp: 60,
                    attack: 45,
                    defense: 50,
                    speAttack: 80,
                    speDefense: 80,
                    speed: 70
                },
                individualStat: {
                    hp: 28,
                    attack: 4,
                    defense: 17,
                    speAttack: 30,
                    speDefense: 27,
                    speed: 31
                },
                effortStat: {
                    hp: 1,
                    attack: 0,
                    defense: 0,
                    speAttack: 63,
                    speDefense: 0,
                    speed: 63
                },
                natureStat: {
                    hp: 1,
                    attack: 0.9,
                    defense: 1,
                    speAttack: 1.1,
                    speDefense: 1,
                    speed: 1
                }
            }
        );

        base.setLevel(53);

        expect(base.stats.hp).toBe(141);
        expect(base.stats.attack).toBe(48);
        expect(base.stats.defense).toBe(67);
        expect(base.stats.speAttack).toBe(152);
        expect(base.stats.speDefense).toBe(104);
        expect(base.stats.speed).toBe(129);

    });

    it("pokemonBase stats with nature", function (){
        const base: Pokemon = new Pokemon(
            {
                name: "papi",
                pokemonName: "Papilusion",
                nature: new PokemonNature("Modest ","attack", "special-attack"),
                type1: new PokemonType("default","none", {} ),
                baseStat: {
                    hp: 60,
                    attack: 45,
                    defense: 50,
                    speAttack: 80,
                    speDefense: 80,
                    speed: 70
                },
                individualStat: {
                    hp: 28,
                    attack: 4,
                    defense: 17,
                    speAttack: 30,
                    speDefense: 27,
                    speed: 31
                },
                effortStat: {
                    hp: 1,
                    attack: 0,
                    defense: 0,
                    speAttack: 63,
                    speDefense: 0,
                    speed: 63
                },
            },

        );

        base.setLevel(53);

        expect(base.stats.hp).toBe(141);
        expect(base.stats.attack).toBe(48);
        expect(base.stats.defense).toBe(67);
        expect(base.stats.speAttack).toBe(152);
        expect(base.stats.speDefense).toBe(104);
        expect(base.stats.speed).toBe(129);

    });

    it("pokemonBase with same Base stats should not be equals", function () {
        const p1: Pokemon = new Pokemon( {
            name: "pika",
            pokemonName: "pikachu",
            type1: new PokemonType("default", "none",{} ),
            nature: new PokemonNature("null", null, null),
            baseStat: {
                hp: 60,
                attack: 45,
                defense: 50,
                speAttack: 80,
                speDefense: 80,
                speed: 70
            }
        });

        const p2: Pokemon = new Pokemon( {
            name: "cara",
            pokemonName: "carapuce",
            type1: new PokemonType("default","none", {} ),
            nature: new PokemonNature("null", null, null),
            baseStat: {
                hp: 60,
                attack: 45,
                defense: 50,
                speAttack: 80,
                speDefense: 80,
                speed: 70
            }
        });

        expect( p1 ).not.toBe( p2 );
    });

});


describe( "pokemon battle damage mechanic", function (){

    test("pokemon damage", function (){
        const p1: Pokemon = new Pokemon( {
            name: "pika",
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

        const p2: Pokemon = new Pokemon( {
            name: "cara",
            pokemonName: "carapuce",
            type1: new PokemonType("default","none", {} ),
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
        const initHp = p2.battleStat.hp;
        const expectedDamage = 73;
        console.log(p1);

        const move =  new PokemonMove("", 100, 60, 15, 0,new PokemonType("", "physical", {}));

        p1.attack(move, p2);

        expect( p2.battleStat.hp ).toBe(initHp - expectedDamage);
    });

    test("pokemon damage with double damage from nature", function (){
        const p1: Pokemon = new Pokemon( {
            name: "pika",
            pokemonName: "pikachu",
            type1: new PokemonType("default", "none",{} ),
            nature: new PokemonNature("null", null, null),
            level:10,
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

        const p2: Pokemon = new Pokemon( {
            name: "cara",
            pokemonName: "carapuce",
            type1: new PokemonType("default","none", {} ),
            nature: new PokemonNature("null", null, null),
            level: 10,
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
        const initHp = p2.battleStat.hp;
        const expectedDamage = 22;

        console.log(p2);
        const move =  new PokemonMove("", 100, 60, 15, 0,new PokemonType("", "physical", {doubleDamageTo:["default"]}));

        p1.attack(move, p2);

        expect( p2.battleStat.hp ).toBe(initHp - expectedDamage);
    });


});

describe( "pokemon battle accuracy mechanic", function (){

    test("pokemon accuracy test with 100 accuracy no modifier", function (){
        const p1: Pokemon = new Pokemon( {
            name: "pika",
            pokemonName: "pikachu",
            type1: new PokemonType("default", "none",{} ),
            nature: new PokemonNature("null", null, null),
            baseStat: {
                hp: 60,
                attack: 45,
                defense: 50,
                speAttack: 80,
                speDefense: 80,
                speed: 70
            }
        });
        const p2: Pokemon = new Pokemon( {
            name: "cara",
            pokemonName: "carapuce",
            type1: new PokemonType("default","none", {} ),
            nature: new PokemonNature("null", null, null),
            baseStat: {
                hp: 60,
                attack: 45,
                defense: 50,
                speAttack: 80,
                speDefense: 80,
                speed: 70
            }

        });
        const move =  new PokemonMove("", 100, 50, 15, 0,new PokemonType("", "", {}));
        const nb = 10;
        let nbHit = 0;

        for (let i = 0; i <nb ; i++) {
            if(p1.doesItHit(move, p2)){
                nbHit += 1;
            }
        }

        expect(nbHit).toBe(nb);
    });

    test("pokemon accuracy test with 50 accuracy no modifier", function (){
        const p1: Pokemon = new Pokemon( {
            name: "pika",
            pokemonName: "pikachu",
            type1: new PokemonType("default", "none",{} ),
            nature: new PokemonNature("null", null, null),
            baseStat: {
                hp: 60,
                attack: 45,
                defense: 50,
                speAttack: 80,
                speDefense: 80,
                speed: 70
            }
        });
        const p2: Pokemon = new Pokemon( {
            name: "cara",
            pokemonName: "carapuce",
            type1: new PokemonType("default","none", {} ),
            nature: new PokemonNature("null", null, null),
            baseStat: {
                hp: 60,
                attack: 45,
                defense: 50,
                speAttack: 80,
                speDefense: 80,
                speed: 70
            }

        });
        const move =  new PokemonMove("", 50, 50, 15, 0,new PokemonType("", "", {}));
        const nb = 1000;
        let nbHit = 0;

        for (let i = 0; i <nb ; i++) {
            if(p1.doesItHit(move, p2)){
                nbHit += 1;
            }
        }
        console.log(nbHit);
        const error = Math.abs( nb/2 - nbHit )
        expect(error).toBeLessThan(nb*0.03 );
    });

    test("pokemon accuracy test with 100 accuracy target has +3 modifier", function (){
        const p1: Pokemon = new Pokemon( {
            name: "pika",
            pokemonName: "pikachu",
            type1: new PokemonType("default", "none",{} ),
            nature: new PokemonNature("null", null, null),
            baseStat: {
                hp: 60,
                attack: 45,
                defense: 50,
                speAttack: 80,
                speDefense: 80,
                speed: 70
            }
        });
        const p2: Pokemon = new Pokemon( {
            name: "cara",
            pokemonName: "carapuce",
            type1: new PokemonType("default","none", {} ),
            nature: new PokemonNature("null", null, null),
            baseStat: {
                hp: 60,
                attack: 45,
                defense: 50,
                speAttack: 80,
                speDefense: 80,
                speed: 70
            }
        });
        p2.evasionStatStage = 3;
        const move =  new PokemonMove("", 100, 50, 15, 0,new PokemonType("", "", {}));
        const nb = 1000;
        let nbHit = 0;
        const expectedNbHit = nb*0.4;

        for (let i = 0; i <nb ; i++) {
            if(p1.doesItHit(move, p2)){
                nbHit += 1;
            }
        }
        console.log(nbHit);
        const error = Math.abs( expectedNbHit - nbHit )
        expect(error).toBeLessThan(nb*0.03 );
    });


    test("pokemon accuracy test with 100 accuracy attacker has +3 modifier", function (){
        const p1: Pokemon = new Pokemon( {
            name: "pika",
            pokemonName: "pikachu",
            type1: new PokemonType("default", "none",{} ),
            nature: new PokemonNature("null", null, null),
            baseStat: {
                hp: 60,
                attack: 45,
                defense: 50,
                speAttack: 80,
                speDefense: 80,
                speed: 70
            }
        });
        p1.accuracyStatStage = 3;
        const p2: Pokemon = new Pokemon( {
            name: "cara",
            pokemonName: "carapuce",
            type1: new PokemonType("default","none", {} ),
            nature: new PokemonNature("null", null, null),
            baseStat: {
                hp: 60,
                attack: 45,
                defense: 50,
                speAttack: 80,
                speDefense: 80,
                speed: 70
            }
        });

        const move =  new PokemonMove("", 50, 50, 15, 0,new PokemonType("", "", {}));
        const nb = 1000;
        let nbHit = 0;
        const expectedNbHit = nb;

        for (let i = 0; i <nb ; i++) {
            if(p1.doesItHit(move, p2)){
                nbHit += 1;
            }
        }

        console.log(nbHit);
        const error = Math.abs( expectedNbHit - nbHit )
        expect(error).toBeLessThan(nb*0.03 );
    });
});


