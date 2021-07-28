
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

