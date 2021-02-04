import {default as Enemy} from "./Enemy.js";

export default class Slime extends Enemy {
    constructor() {
        super(1, 6, 4, 7, 6, 4, "./Monsters/slime.svg", "Slime", "A hefty chonk, very slow but strong!");
    }
}

export class Rat extends Enemy {
    constructor() {
        super(1, 2, 1, 3, 2, 1, "./Monsters/rat.svg", "Rat", "A sneaky little b*tch, fast and weak.");
    }
}