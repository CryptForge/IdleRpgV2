export default class Weapon {

    weaponName;
    damage;
    attackSpeed;
    critChance;

    constructor(weaponName,damage,attackSpeed,critChance) {
        this.weaponName = weaponName;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.critChance = critChance;
    }

}