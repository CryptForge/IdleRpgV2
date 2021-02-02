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
        if(this.gold >= this.enhanceUpgrade.price) {
            this.gold -= this.enhanceUpgrade.price;
            this.enhanceUpgrade.upgrade();
            this.damage = this.enhanceUpgrade.level;
            this.onUpgrade;
        }
    }
}