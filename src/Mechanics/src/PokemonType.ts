
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

  getColor(){
    switch ( this.name) {
      case "normal":
        return 'gray';
      case "fighting":
        return '#BE1593';
      case "flying":
        return '#4d7a8f';
      case "poison":
        return '#5016ae';
      case "ground":
        return '#835015';
      case "rock":
        return '#736744';
      case "bug":
        return '#338F1B';
      case "ghost":
        return '#1A3699';
      case "steel":
        return '#305373';
      case "fire":
        return '#FF7302';
      case "water":
        return '#048CE7';
      case "grass":
        return '#0D8C19';
      case "electric":
        return '#D9E515';
      case "psychic":
        return '#b52ba2';
      case "ice":
        return '#21E3D3';
      case "dragon":
        return '#0076FF';
      case "dark":
        return '#220A4F';
      case "fairy":
        return '#FF00F2';
      case "unknown":
        return '#36584B';
      case "shadow":
        return '#01030A';
      default:
        return 'gray';
    }
  }

  getColorBorder(){
    if(this.name === "shadow" ||this.name === "dark"){
      return '#F1F2F3';
    }else{
      return '#1c1c1c';
    }
  }
}

