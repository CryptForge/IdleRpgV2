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
