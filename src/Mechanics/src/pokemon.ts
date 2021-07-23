import {PokemonMove} from "./pokemonMove";
import { PokemonNature, pokemonNatureToStat} from "./pokemonNature";
import { PokemonType} from "./PokemonType";

const maxIndividualStat: number = 32;

export interface PokemonStat{

    hp: number;
    attack: number;
    defense: number;
    speAttack: number;
    speDefense: number;
    speed: number;

}

export interface IPokemonInitializer{
    pokemonName: string;
    name: string;

    nature: PokemonNature;

    type1: PokemonType;
    type2?: PokemonType;

    level?: number;
    imageLink?: string;

    baseStat: PokemonStat;
    individualStat?: PokemonStat;
    effortStat?: PokemonStat;
    natureStat?: PokemonStat;

    moves?: PokemonMove[];
}
/*
export async function getPokemonFromApi(name: string, pokemonName: string){
    const data = await P.getPokemonByName(pokemonName);

    return new Pokemon(
        {
            name,
            pokemonName,
            type1: await getPokemonType( data.types[0].type.name ),
            type2: data.types[1]? await getPokemonType( data.types[0].type.name ): undefined,
            nature: await getRandomNature(),
            baseStat: {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speAttack: data.stats[3].base_stat,
                speDefense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat
            },
            effortStat: {
                hp: data.stats[0].effort,
                attack: data.stats[1].effort,
                defense: data.stats[2].effort,
                speAttack: data.stats[3].effort,
                speDefense: data.stats[4].effort,
                speed: data.stats[5].effort
            }
        }

    );

}
*/

export class Pokemon {
    pokemonName: string;
    name: string;

    imageLink: string;

    nature: PokemonNature;
    type1: PokemonType;
    type2: PokemonType | undefined;

    level: number;

    stats: PokemonStat;
    stageStat: PokemonStat;
    evasionStatStage: number;
    accuracyStatStage: number;
    battleStat: PokemonStat;

    private baseStat: PokemonStat;
    private individualStat: PokemonStat;
    effortStat: PokemonStat;
    natureStat: PokemonStat;

    moves: PokemonMove[];

  constructor(args: IPokemonInitializer) {
        this.name = args.name;
        this.pokemonName = args.pokemonName;
        this.baseStat = args.baseStat;
        this.level = 0;

        this.stats = {
            hp: 0,
            attack: 0,
            defense: 0,
            speAttack: 0,
            speDefense: 0,
            speed: 0,
        }

        this.stageStat = {
            hp: 0,
            attack: 0,
            defense: 0,
            speAttack: 0,
            speDefense: 0,
            speed: 0,
        }

        this.evasionStatStage = 0;
        this.accuracyStatStage = 0;

        this.type1 = args.type1;
        this.type2 = args.type2;

        if( args.imageLink !== undefined){
          this.imageLink = args.imageLink;
        }else{
          this.imageLink = "";
        }

        if( args.individualStat !== undefined) {
            this.individualStat = args.individualStat;
        }else{
            this.individualStat = {
                hp: Math.random()*maxIndividualStat,
                attack: Math.random()*maxIndividualStat,
                defense: Math.random()*maxIndividualStat,
                speAttack: Math.random()*maxIndividualStat,
                speDefense: Math.random()*maxIndividualStat,
                speed: Math.random()*maxIndividualStat,
            }
        }

        if( args.effortStat !== undefined) {
            this.effortStat = args.effortStat;
        }else{
            this.effortStat = {
                hp: 0,
                attack: 0,
                defense: 0,
                speAttack: 0,
                speDefense: 0,
                speed: 0,
            }
        }

        if( args.natureStat !== undefined) {
            this.natureStat = args.natureStat;
            this.nature = new PokemonNature('personalized', "", "");
        }else if (args.nature !== undefined){
            this.nature = args.nature;
            this.natureStat = pokemonNatureToStat(args.nature);
        }else{
            this.nature = new PokemonNature('default', "", "");
            this.natureStat = {
                hp: 1,
                attack: 1,
                defense: 1,
                speAttack: 1,
                speDefense: 1,
                speed: 1,
            }
        }
        if( args.moves === undefined){
            this.moves = [];
        }else{
            this.moves = args.moves;
        }

        if( args.level === undefined){
            this.setLevel(1);
        }else{
            this.setLevel( args.level);
        }

        this.battleStat = { ...this.stats
        };

    }

    copy(): Pokemon{
      return new Pokemon( {
        pokemonName: this.pokemonName,
        name: this.name,
        nature: this.nature,
        type1: this.type1,
        type2: this.type1,
        level: this.level,
        imageLink: this.imageLink,
        baseStat: this.baseStat,
        individualStat: this.individualStat,
        effortStat: this.effortStat,
        natureStat: this.natureStat,
        moves: this.moves
      });
    }

    setLevel( level: number): void{
        this.level = level;

        this.stats.attack = Math.floor( Math.floor((2 * this.baseStat.attack + this.individualStat.attack + this.effortStat.attack) * level / 100 + 5)* this.natureStat.attack );
        this.stats.defense = Math.floor( Math.floor((2 * this.baseStat.defense + this.individualStat.defense + this.effortStat.defense) * level / 100 + 5)* this.natureStat.defense );
        this.stats.speAttack = Math.floor( Math.floor((2 * this.baseStat.speAttack + this.individualStat.speAttack + this.effortStat.speAttack) * level / 100 + 5)* this.natureStat.speAttack );
        this.stats.speDefense = Math.floor( Math.floor((2 * this.baseStat.speDefense + this.individualStat.speDefense + this.effortStat.speDefense) * level / 100 + 5)* this.natureStat.speDefense );
        this.stats.speed = Math.floor( Math.floor((2 * this.baseStat.speed + this.individualStat.speed + this.effortStat.speed) * level / 100 + 5)* this.natureStat.speed );

        this.stats.hp = Math.floor( (2 * this.baseStat.hp + this.individualStat.hp + this.effortStat.hp) * level / 100 + level + 10 );
    }

    doesItHit(move: PokemonMove, target: Pokemon): boolean{
        let accuracyStatStage = this.accuracyStatStage - target.evasionStatStage;
        if( accuracyStatStage > 6){
            accuracyStatStage = 6;
        }else if( accuracyStatStage < -6){
            accuracyStatStage = -6;
        }
        const accuracy = move.accuracy *  Math.max(2, 2 +accuracyStatStage)/Math.max(2, 2-accuracyStatStage);

        return Math.random()*100 < accuracy;
    }

    attack( move: PokemonMove, target: Pokemon): number{
        if( move.type.moveDamageClass !== "status" ) {

            const A = move.type.moveDamageClass === "physical" ? this.battleStat.attack : this.battleStat.speAttack;
            const D = move.type.moveDamageClass === "physical" ? target.battleStat.defense : target.battleStat.speDefense;
            let damage = Math.floor(Math.floor(Math.floor(2 * this.level / 5 + 2) * A * move.power / D) / 50) + 2;
            damage *= move.type.getDamageMultiplier(target.type1, target.type2);

            console.log(this.name +" attack: " + target.name);

            target.battleStat.hp -= damage;
            if( target.battleStat.hp <0 ){
              target.battleStat.hp = 0;
            }
            return damage;
        }

        return -1;
    }

    isDead(){
        return this.battleStat.hp <= 0;
    }

    addMove(move: PokemonMove): void{
        if( this.moves.length<4)
            this.moves.push(move);
    }

    levelUp(): void{
        this.setLevel( this.level +1);
    }

    getNextMove(): PokemonMove{
        return this.moves[ Math.floor( Math.random() * this.moves.length ) ];
    }

    choiceTarget(pokemons: Pokemon[]): Pokemon[]{
        const res = pokemons.find( v => v != this);
        if( res == undefined)
            return [];
        else{
            return [res];
        }
    }

}



