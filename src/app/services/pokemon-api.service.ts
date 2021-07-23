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

  constructor(private httpClient: HttpClient) {
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

    const pokemonType: PokemonType | undefined = this.types .find( type => type.name === typeName);
    if( pokemonType === undefined){
      throw new Error("Unknown pokemon type: " + typeName);
    }else{
      return pokemonType;
    }
  }

  async getAllPokemons(): Promise<Pokemon[]> {

    if( this.pokemons.length == 0){
      let pl: pokemonList;
      pl = await this.httpClient.get<pokemonList>("https://pokeapi.co/api/v2/pokemon?limit=200").toPromise();
      let n = 0;
      for( let i of pl.results){
        n+=1;
        const data = await this.httpClient.get<any>("https://pokeapi.co/api/v2/pokemon/"+i.name).toPromise();

        console.log("test "+n+" : "+ i.name+" "+ data.sprites.front_default);
        this.pokemons.push(new Pokemon(
                                  {
                                    name: "",
                                    imageLink: data.sprites.front_default,
                                    pokemonName: i.name,
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
                                  })
        );
      }
    }

    return this.pokemons;
  }

  async getMove(moveName: string){
    this.moves.find(value => value.name === moveName);
  }

  async getPokemon(name: string){
    let pokemons = await this.getAllPokemons();
    return pokemons.find(value => value.pokemonName === name);
  }
}

