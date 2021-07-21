import {Pokemon } from "./pokemon";
import {PokemonMove} from "./pokemonMove";


interface pokemonBattleMove{
    pokemon: Pokemon;
    teams: number;
    move: PokemonMove;
    targets: Array<Pokemon>;
}

export class Battle{

    pokemonToMove: number = -1;
    pokemons: Array<pokemonBattleMove> = [];

    constructor() {

    }

    initBattle(pokemons: Array<Pokemon>){
        for (let i = 0; i < pokemons.length; i++) {
            this.pokemons[i] = {
                pokemon: pokemons[i],
                teams: i,
                move: pokemons[i].moves[0],
                targets: []
            }
        }
    }

    prepareNextTurn(): void{

        for (let i = 0; i < this.pokemons.length; i++) {
            this.pokemons[i].move = this.pokemons[i].pokemon.getNextMove();
            this.pokemons[i].targets = this.pokemons[i].pokemon.choiceTarget( this.pokemons.map( function (value){
                return value.pokemon;
            }));

        }

        this.pokemons = this.pokemons.sort( function (p1, p2){
            if( p1.move &&  p2.move && (p2.move.priority !== p1.move.priority ) ){
                return p2.move.priority - p1.move.priority;
            }else if (p2.pokemon.battleStat.speed === p1.pokemon.battleStat.speed ){
                return p2.pokemon.battleStat.speed - p1.pokemon.battleStat.speed;
            }else if( Math.random() > 0.5){
                return -1;
            }else{
                return  1;
            }

        });

        this.pokemonToMove = 0;
        console.log("prepareNextTurn: "+ this.pokemonToMove);
    }

    getNextPokemonToMove(): Pokemon {
        console.log("test: " + this.pokemonToMove);
        return this.pokemons[this.pokemonToMove].pokemon;
    }

    getNextPokemonAction(): pokemonBattleMove {
        if( this.pokemonToMove < 0 || this.pokemonToMove >= this.pokemons.length){
          this.prepareNextTurn();
        }
        console.log("test: " + this.pokemonToMove);
        this.pokemonToMove += 1;
        return this.pokemons[this.pokemonToMove - 1];
    }

    isFightOver(): boolean{
        let b = true;

        for (let i = 0; i <this.pokemons.length; i++) {
            if( this.pokemons[i].teams != this.pokemons[0].teams ){
                b = false;
            }
        }
        console.log("isFightOver: " + b);
        return b;
    }

    stepTurn(): void{
        let pokemonToPlay = this.getNextPokemonToMove();

        if( pokemonToPlay == null){
           this.prepareNextTurn();
            pokemonToPlay = this.getNextPokemonToMove();
        }

        if( pokemonToPlay == null){
            throw new Error("Pokemon to play is null");
        }

        const battleMove: pokemonBattleMove = this.pokemons[this.pokemonToMove];
        let move = battleMove.move;

        if(move == null){
            throw new Error("Pokemon to play move is null");
        }

        for (let i = 0; i < battleMove.targets.length; i++) {
            const target = battleMove.targets[i];
            pokemonToPlay.attack(move, target);
            if( target.isDead() ){
                this.pokemons = this.pokemons.filter(function (curr){
                    return curr.pokemon !== target;
                });
            }
        }

        this.pokemonToMove += 1;
    }
    async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async doFight(){
        while ( !this.isFightOver()){
            await this.delay(1000);
            this.stepTurn();
            for (let i = 0; i < this.pokemons.length; i++) {
                console.log(this.pokemons[i].pokemon.name + " hp: " + this.pokemons[i].pokemon.battleStat.hp + "/" + this.pokemons[i].pokemon.stats.hp);
            }
        }
    }

}
