import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from '../../Mechanics/src/pokemon';
import {PokemonNature} from '../../Mechanics/src/pokemonNature';
import {PokemonType} from '../../Mechanics/src/PokemonType';
import {PokemonMove} from '../../Mechanics/src/pokemonMove';
import {concatMap, filter, map, switchMap, tap} from 'rxjs/operators';
import {forkJoin, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/internal/operators';


interface MoveApi{
  name: string;
  accuracy: number;
  power: number;
  pp: number;
  priority: number;
  type: NameUrl;
}

interface PokemonSpecieData{
  id: string;
}

interface NameUrl{
  name: string;
  url: string;
}

interface PokemonDataMovesItem{
  move: NameUrl;
  version_group_details: any[];
}


interface PokemonDataTypesItem{
  slot: number;
  type: NameUrl;
}

interface PokemonSprite{
  front_default: string;
}

interface PokemonStatsItem{
  base_stat: number;
  effort: number;
  stat: NameUrl;
}

interface PokemonData{
  id: string;
  name: string;
  moves: PokemonDataMovesItem[];
  types: PokemonDataTypesItem[];
  sprites: PokemonSprite;
  stats: PokemonStatsItem[];
}

interface PokemonGenerationList{
  count: number;
  results: NameUrl[];
}

interface PokemonGeneration{
  id: number;
  pokemon_species: NameUrl[];
}

interface PokemonForm{
  name: string;
  sprites: PokemonSprite;
}

export interface PokemonImg{
  name: string,
  imgLink: string
}


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
        console.log("load type: "+t.name +" ended");
      }
    }
    return this.types;
  }

  getPokemonType(typeName: string){
    const pokemonType: PokemonType | undefined = this.types.find( type => type.name === typeName);
    if( pokemonType === undefined){
      return this.httpClient.get<any>("https://pokeapi.co/api/v2/type/"+typeName).pipe(
        map(jsonType => new PokemonType( typeName, jsonType.move_damage_class?.name, {
          doubleDamageFrom: jsonType.damage_relations.double_damage_from.map( (v: { name: string; }) =>  v.name ),
          doubleDamageTo: jsonType.damage_relations.double_damage_to.map( (v: { name: string; }) =>  v.name ),
          halfDamageFrom: jsonType.damage_relations.half_damage_from.map( (v: { name: string; }) =>  v.name ),
          halfDamageTo: jsonType.damage_relations.half_damage_to.map( (v: { name: string; }) =>  v.name ),
          noDamageFrom: jsonType.damage_relations.no_damage_from.map( (v: { name: string; }) =>  v.name ),
          noDamageTo: jsonType.damage_relations.no_damage_to.map( (v: { name: string; }) =>  v.name )
        }))
      )
    }else{
      return of(pokemonType);
    }
  }

  getAllPokemonByGeneration(generationName: string): Observable<PokemonImg[]> {
    return this.httpClient.get<PokemonGeneration>("https://pokeapi.co/api/v2/generation/"+generationName).pipe(
      switchMap(value => forkJoin( value.pokemon_species.map(value1 => {
          let l = value1.url.split("/");
          return this.getPokemonImg(l[l.length-2])
        }) )
      )
    )
  }

  getAllGeneration() {
    return this.httpClient.get<PokemonGenerationList>("https://pokeapi.co/api/v2/generation/").pipe(
      map(value => value.results.map(value1 => value1.name))
    )
  }

  getPokemonImg(pokemon: string): Observable<PokemonImg>{
    return this.httpClient.get<PokemonForm>("https://pokeapi.co/api/v2/pokemon-form/"+pokemon).pipe(
      map(value => {
        return{
          name: value.name,
          imgLink: value.sprites.front_default
        }
      })
    )
  }

  /**
   *
   * @param pokemonSpeciesName or ID
   */
  getPokemonSpecies(pokemonSpeciesName: string){
    return this.httpClient.get<PokemonSpecieData>("https://pokeapi.co/api/v2/pokemon-species/"+pokemonSpeciesName);
  }

  /**
   *
   * @param pokemon name or id
   */
  getPokemonData(pokemon: string){
    return this.httpClient.get<PokemonData>("https://pokeapi.co/api/v2/pokemon/"+pokemon);
  }

  getPokemon2(pokemon: string){
    this.getPokemonSpecies(pokemon).pipe(
      switchMap((value, index) => this.getPokemonData(value.id)),
      switchMap((value, index) => {
        return value.moves.map( value =>  this.getMove(value.move.name))
      })
    ).subscribe(value => {

    });

  }


  getPokemonByName(pokemonName: string){
    return this.getPokemonSpecies(pokemonName).pipe(
      switchMap(speciesData => this.getPokemonData(speciesData.id).pipe(
          switchMap(pokemonData => forkJoin( pokemonData.types.map(value2 => this.getPokemonType(value2.type.name))).pipe(
              switchMap(types => forkJoin(pokemonData.moves.map(value3 => this.getMove(value3.move.name))).pipe(
                map(movesData => {
                  movesData = movesData.filter(value => value.power !== null && value.accuracy !== null);
                  let moves: PokemonMove[] = [];
                  let nb = movesData.length;
                  if(nb > 4){
                    for(let i = 0; i<4; i++)
                      moves.push( movesData[ Math.floor( Math.random() * nb ) ]);
                  }else if(nb <= 0){
                    moves.push( new PokemonMove("default", 100, 50, 15, 0, types[0]));
                  }else{
                    moves = movesData;
                  }

                  return new Pokemon(
                    {
                      name: "",
                      imageLink: pokemonData.sprites.front_default,
                      pokemonName: pokemonData.name,
                      level:50,
                      moves,
                      type1: types[0],
                      type2: undefined,
                      nature: new PokemonNature("default", "", ""),
                      baseStat: {
                        hp: pokemonData.stats[0].base_stat,
                        attack: pokemonData.stats[1].base_stat,
                        defense: pokemonData.stats[2].base_stat,
                        speAttack: pokemonData.stats[3].base_stat,
                        speDefense: pokemonData.stats[4].base_stat,
                        speed: pokemonData.stats[5].base_stat
                      },
                      effortStat: {
                        hp: pokemonData.stats[0].effort,
                        attack: pokemonData.stats[1].effort,
                        defense: pokemonData.stats[2].effort,
                        speAttack: pokemonData.stats[3].effort,
                        speDefense: pokemonData.stats[4].effort,
                        speed: pokemonData.stats[5].effort
                      }
                    })
                  })
                )
              )
            )
          )
        )
      )
    )
  }

/*
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
*/

  getMove(moveName: string){
    let move: PokemonMove |undefined = this.moves.find(value => value.name === moveName);
    if( move === undefined){

      return this.httpClient.get<MoveApi>("https://pokeapi.co/api/v2/move/"+moveName).pipe(
        switchMap(data => {
            return this.getPokemonType(data.type.name).pipe(
              map(type => new PokemonMove(moveName, data.accuracy, data.power, data.pp, data.priority, type) ),
              tap(x => this.moves.push(x))
            )
          }
        )
      )
    }else{
      return of(move);
    }
  }

  //new PokemonMove(moveName, data.accuracy, data.power, data.pp, data.priority, type )
  /*
  async getPokemon(name: string): Promise<Pokemon | undefined>{

    let pokemons = await this.getAllPokemons();
    let poke =  pokemons.find(value => value.pokemonName === name);

    if( poke === undefined){
      return undefined;
    }else{
      return poke.copy();
    }

  }*/
}

