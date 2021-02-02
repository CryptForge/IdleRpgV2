class Upgrade {

    constructor(price,priceIncrease) {
        this.price = price;
        this.priceIncrease = priceIncrease;
        this.level = 1;
    }

    upgrade() {
        this.level++;
        this.price *= this.priceIncrease;
    }

    get getPrice() {
        return this.price;
    }

    get getLevel() {
        return this.level;
    }

}