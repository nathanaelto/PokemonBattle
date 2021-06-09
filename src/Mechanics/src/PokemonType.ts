
let typeList: Array<PokemonType> | null = null
/*
async function loadAllType(){
    if ( typeList === null){

        const list = await P.getTypesList();

        typeList = new Array<PokemonType>();

        for (let i = 0; i < list.count ; i++) {
            const data = await P.getTypeByName( list.results[i].name );
            typeList.push( new PokemonType( list.results[i].name, data.move_damage_class.name, {
                doubleDamageFrom: data.damage_relations.double_damage_from.map( (v: { name: string; }) =>  v.name ),
                doubleDamageTo: data.damage_relations.double_damage_to.map( (v: { name: string; }) =>  v.name ),
                halfDamageFrom: data.damage_relations.half_damage_from.map( (v: { name: string; }) =>  v.name ),
                halfDamageTo: data.damage_relations.half_damage_to.map( (v: { name: string; }) =>  v.name ),
                noDamageFrom: data.damage_relations.no_damage_from.map( (v: { name: string; }) =>  v.name ),
                noDamageTo: data.damage_relations.no_damage_to.map( (v: { name: string; }) =>  v.name )
            }));
        }
    }

    return typeList;
}
*/
/*
export async function getPokemonType( typeName: string): Promise<PokemonType>{
    if(typeList === null ){
        typeList = await loadAllType();
    }

    const pokemonType: PokemonType | undefined = typeList.find( type => type.name === typeName);
    if( pokemonType === undefined){
        throw new Error("Unknown pokemon type: " + typeName);
    }else{
        return pokemonType;
    }
}
*/

export interface IPokemonType{

    doubleDamageFrom?: Array<string> ;
    doubleDamageTo?: Array<string> ;
    halfDamageFrom?: Array<string> ;
    halfDamageTo?: Array<string> ;
    noDamageFrom?: Array<string> ;

    noDamageTo?: Array<string> ;
}

export class PokemonType implements IPokemonType{

    name: string;
    moveDamageClass: string;

    doubleDamageFrom: Array<string> | undefined;
    doubleDamageTo: Array<string> | undefined;
    halfDamageFrom: Array<string> | undefined;
    halfDamageTo: Array<string> | undefined;
    noDamageFrom: Array<string> | undefined;
    noDamageTo: Array<string> | undefined;

    constructor(name: string, moveDamageClass: string, damageRelation: IPokemonType) {
        this.name = name;
        this.moveDamageClass = moveDamageClass;
        this.doubleDamageFrom = damageRelation.doubleDamageFrom;
        this.doubleDamageTo = damageRelation.doubleDamageTo;
        this.halfDamageFrom = damageRelation.halfDamageFrom;
        this.halfDamageTo = damageRelation.halfDamageTo;
        this.noDamageFrom = damageRelation.noDamageFrom;
        this.noDamageTo = damageRelation.noDamageTo;
    }

    getDamageMultiplier(type1: PokemonType, type2?: PokemonType): number{
        let multiplier = 1;
        if( this.doubleDamageTo) {
            const list = this.doubleDamageTo.filter(type => type === type1.name || type === type2?.name);
            if( list.length > 0){
                multiplier *= Math.pow(2, list.length);
            }
        }

        if( this.halfDamageTo) {
            const list = this.halfDamageTo.filter(type => type === type1.name || type === type2?.name);
            if( list.length > 0){
                multiplier *= Math.pow(0.5, list.length);
            }
        }

        if( this.noDamageTo?.find(type => type === type1.name || type === type2?.name) !== undefined){
            multiplier *= 0;
        }

        return multiplier;
    }
}

