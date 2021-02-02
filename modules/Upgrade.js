export default class Upgrade {
    level = 1;
    price;
    priceIncrease;

    constructor(price, priceIncrease, onUpgrade) {
        this.price = price;
        this.priceIncrease = priceIncrease;
        this.onUpgrade = onUpgrade;
    }

    upgrade() {
        this.level++;
        this.price *= this.priceIncrease;
        this.onUpgrade();
    }
}