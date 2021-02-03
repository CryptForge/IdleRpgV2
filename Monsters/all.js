import {default as Enemy} from "./Enemy.js";

export default class Slime extends Enemy {
    constructor() {
        super(
            1,
            3,
            3,
            6,
            6,
            6,
            7,
            8,
            "./Monsters/slime.svg",
            "Slime"
        );
    }
}

export class Rat extends Enemy {
    constructor() {
        super(
            1, 3, 2, 4, 4, 4, 3, 4, "./Monsters/rat.svg", "Rat"
        );
    }
}