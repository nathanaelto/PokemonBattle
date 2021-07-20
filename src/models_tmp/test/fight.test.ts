import {Pokemon} from '../pokemon';
import {whoAttackFirst} from '../../controllers/fight';
import {Attacks} from '../attacks';
import {Fight} from '../fight';

describe('Who attack first', () => {
    it('should return Pika when he start a fight whith carapuce ', () => {
        const pika = new Pokemon(
            'Pikachu',
            90,
            100,
            new Attacks([
                { name: 'Queu de fer', damage: 10 },
                { name: 'Eclair', damage: 30 },
                { name: 'Vive attaque', damage: 25},
                { name: 'Coup d\'Jus', damage: 15}
            ])
        );
        const cara = new Pokemon(
            'Carapuce',
            75,
            150,
            new Attacks([
                { name: 'Canon a eau', damage: 35},
                { name: 'Coup de boul', damage: 5},
                { name: 'Vibraqua', damage: 20},
                { name: 'Hydroqueue', damage: 10}
            ])
        );
        // const result = whoAttackFirst(pika, cara);
        // expect(result.name).toBe('Pikachu');
    });
});

describe('Picachu attack Carapuce', () => {
    const pika = new Pokemon(
        'Pikachu',
        90,
        100,
        new Attacks([
            { name: 'Queu de fer', damage: 10 },
            { name: 'Eclair', damage: 30 },
            { name: 'Vive attaque', damage: 25},
            { name: 'Coup d\'Jus', damage: 15}
        ])
    );
    const cara = new Pokemon(
        'Carapuce',
        75,
        150,
        new Attacks([
            { name: 'Canon a eau', damage: 35},
            { name: 'Coup de boul', damage: 5},
            { name: 'Vibraqua', damage: 20},
            { name: 'Hydroqueue', damage: 10}
        ])
    );

    beforeEach( () => {
        cara.hp = 150;
    });

    let attackId: number;
    it('should Carapuce lose 10 HP when Pikachu use Queu de fer', function() {
        attackId = 0;
        pika.useAttackIdTo(attackId, cara);
        expect(cara.hp).toBe(140);
    });

    it('should Carapuce lose 30 HP when Pikachu use Eclair', function() {
        attackId = 1;
        pika.useAttackIdTo(attackId, cara);
        expect(cara.hp).toBe(120);
    });

    it('should Carapuce lose 25 HP when Pikachu use Vive attaque', function() {
        attackId = 2;
        pika.useAttackIdTo(attackId, cara);
        expect(cara.hp).toBe(125);
    });

    it('should Carapuce lose 15 HP when Pikachu use Coup d\'Jus', function() {
        attackId = 3;
        pika.useAttackIdTo(attackId, cara);
        expect(cara.hp).toBe(135);
    });

});

describe('Fight between Pikachu & Carapuce', () => {
    const pika = new Pokemon(
        'Pikachu',
        90,
        100,
        new Attacks([
            {name: 'Queu de fer', damage: 10},
            {name: 'Eclair', damage: 30},
            {name: 'Vive attaque', damage: 25},
            {name: 'Coup d\'Jus', damage: 15}
        ])
    );
    const cara = new Pokemon(
        'Carapuce',
        75,
        50,
        new Attacks([
            {name: 'Canon a eau', damage: 35},
            {name: 'Coup de boul', damage: 5},
            {name: 'Vibraqua', damage: 20},
            {name: 'Hydroqueue', damage: 10}
        ])
    );

    jest.setTimeout(10000);

    it('winner should be Pikachu', async function() {
        const fight = new Fight({
            p1: pika,
            p2: cara
        });
        const winner = await fight.fight();
        expect(winner.name).toBe('Pikachu');
    });

});
