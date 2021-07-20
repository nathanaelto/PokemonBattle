export interface AttackProps {
    name: string;
    damage: number;
}

export class Attack {
    name: string;
    damage: number;

    constructor(props: AttackProps) {
        this.name = props.name;
        this.damage = props.damage;
    }
}