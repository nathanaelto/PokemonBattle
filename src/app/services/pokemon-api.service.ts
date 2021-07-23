import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from '../../Mechanics/src/pokemon';
import {PokemonNature} from '../../Mechanics/src/pokemonNature';
import {PokemonType} from '../../Mechanics/src/PokemonType';
import {PokemonMove} from '../../Mechanics/src/pokemonMove';


class pokemonListItem{
  name: string;
  url: string;
  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}

class pokemonList{
  count: number;
  results: pokemonListItem[];
  constructor(count: number, results: pokemonListItem[]) {
    this.count = count;
    this.results = results;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  private pokemons: Pokemon[] = [];
  private natures: PokemonNature[] = [];
  private types: PokemonType[] = [];
  private moves: PokemonMove[] = [];

  private generations: string[] = [];
  private loadedGeneration: string = "";

  constructor(private httpClient: HttpClient) {
  }

  async getAllGenerationNames(): Promise<string[]> {
    if(this.generations.length == 0) {
      const generationList = await this.httpClient.get<any>("https://pokeapi.co/api/v2/generation").toPromise();
      for(let generation of generationList.results){
        this.generations.push(generation.name);
      }
    }

    return this.generations;
  }

  async getAllPokemonTypes(): Promise<PokemonType[]> {
    if(this.types.length == 0){
      const typeList = await this.httpClient.get<pokemonList>("https://pokeapi.co/api/v2/type").toPromise();

      for(let t of typeList.results){

        console.log("load type: "+t.name);

        const jsonType = await this.httpClient.get<any>("https://pokeapi.co/api/v2/type/"+t.name).toPromise();
        this.types.push( new PokemonType( t.name, jsonType.move_damage_class?.name, {
          doubleDamageFrom: jsonType.damage_relations.double_damage_from.map( (v: { name: string; }) =>  v.name ),
          doubleDamageTo: jsonType.damage_relations.double_damage_to.map( (v: { name: string; }) =>  v.name ),
          halfDamageFrom: jsonType.damage_relations.half_damage_from.map( (v: { name: string; }) =>  v.name ),
          halfDamageTo: jsonType.damage_relations.half_damage_to.map( (v: { name: string; }) =>  v.name ),
          noDamageFrom: jsonType.damage_relations.no_damage_from.map( (v: { name: string; }) =>  v.name ),
          noDamageTo: jsonType.damage_relations.no_damage_to.map( (v: { name: string; }) =>  v.name )
        }));
      }
    }
    return this.types;
  }

  async getPokemonType(typeName: string){
    if(this.types.length  == 0 ){
      this.types  = await this.getAllPokemonTypes();
    }

    const pokemonType: PokemonType | undefined = this.types.find( type => type.name === typeName);
    if( pokemonType === undefined){
      throw new Error("Unknown pokemon type: " + typeName);
    }else{
      return pokemonType;
    }
  }

  async getAllPokemonByGeneration(generationName: string): Promise<Pokemon[]> {
    if( this.loadedGeneration !== generationName){
      this.pokemons = [];
      const data = await this.httpClient.get<any>("https://pokeapi.co/api/v2/generation/"+generationName).toPromise();

      for(let pokemon of data.pokemon_species){
        this.pokemons.push( await this.getPokemonByName(pokemon.name));
      }

      this.loadedGeneration = generationName;
    }

    return this.pokemons;
  }

  /**
   *
   * @param pokemonName or pokemonID
   */
  async getPokemonByName(pokemonName: string){

    //console.log("loading pokemon:  "+pokemonName);
    const speciesData = await this.httpClient.get<any>("https://pokeapi.co/api/v2/pokemon-species/"+pokemonName).toPromise();
    const pokemonID = speciesData.id;

    const data = await this.httpClient.get<any>("https://pokeapi.co/api/v2/pokemon/"+pokemonID).toPromise();

    const numberOfMove = data.moves.length;
    let moves: PokemonMove[] = [];
    for(let i = 0; i<4; i++){
      let move;

      do {
        let rand = Math.floor(Math.random() * numberOfMove);
        move = await this.getMove(data.moves[rand].move.name);
      }while(move.accuracy === null || move.power === null);

      moves.push(move);
    }

    return new Pokemon(
      {
        name: "",
        imageLink: data.sprites.front_default,
        pokemonName: data.name,
        level:50,
        moves,
        type1: await this.getPokemonType( data.types[0].type.name ),
        type2: data.types[1]? await this.getPokemonType( data.types[0].type.name ): undefined,
        nature: new PokemonNature("default", "", ""),
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
      });
  }

  async getAllPokemons(): Promise<Pokemon[]> {

    if( this.pokemons.length == 0){
      let pl: pokemonList;
      pl = await this.httpClient.get<pokemonList>("https://pokeapi.co/api/v2/pokemon?limit=200").toPromise();

      for( let i of pl.results){
        this.pokemons.push( await this.getPokemonByName(i.name));
      }
    }

    return this.pokemons;
  }

  async getMove(moveName: string){
    let move: PokemonMove |undefined = this.moves.find(value => value.name === moveName);
    if( move === undefined){
      const data = await this.httpClient.get<any>("https://pokeapi.co/api/v2/move/"+moveName).toPromise();
      console.log("Move: "+ moveName+" acc: "+ data.accuracy+" p: "+data.power+"  prio: "+ data.priority);
      move = new PokemonMove(moveName, data.accuracy, data.power, data.pp, data.priority, await this.getPokemonType(data.type.name))
      this.moves.push(move);
      return move;
    }else{
      return move;
    }
  }

  async getPokemon(name: string): Promise<Pokemon | undefined>{

    let pokemons = await this.getAllPokemons();
    let poke =  pokemons.find(value => value.pokemonName === name);

    if( poke === undefined){
      return undefined;
    }else{
      return poke.copy();
    }

  }
}

