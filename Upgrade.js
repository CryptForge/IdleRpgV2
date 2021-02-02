class Upgrade {

    level = 1;
    price;
    priceIncrease;

    constructor(price,priceIncrease) {
        this.price = price;
        this.priceIncrease = priceIncrease;
    }

    upgrade() {
        this.level++;
        this.price *= this.priceIncrease;
    }

}