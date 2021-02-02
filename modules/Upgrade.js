export default class Upgrade {
    level = 1;
    price;
    priceIncrease;
    Title;
    Description;

    constructor(title, desc, price, priceIncrease, onUpgrade) {
        this.Title = title;
        this.Description = desc;
        this.price = price;
        this.priceIncrease = priceIncrease;
        this.onUpgrade = onUpgrade;
    }

    upgrade() {
        this.level++;
        this.price = Math.round(this.price * this.priceIncrease*100)/100;
        this.onUpgrade();
    }
}