export class Log {
  pokemon?: string;
  attack?: string;
  log: string;
  type: number;
  pid?: number;

  constructor(pokemon: string | undefined, attack: string | undefined, log: string, type: number, pid: number |undefined) {
    this.pokemon = pokemon;
    this.attack = attack;
    this.log = log;
    this.type = type;
    this.pid = pid;
  }

  /*
  Type :
  0 : start
  1 : attack
  2 : win

   */
}
