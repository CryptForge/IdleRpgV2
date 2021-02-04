export default class Upgrade {
    level = 1;
    price = 10;
    priceIncrease = 3248209384;
    Title = "yeet";
    Description = "error";
    unlocked = true;

    constructor(title, desc, price, priceIncrease, onUpgrade, unlocked = true) {
        this.Title = title;
        this.Description = desc;
        this.price = price;
        this.priceIncrease = priceIncrease;
        this.onUpgrade = onUpgrade;
        this.unlocked = unlocked;
    }

    upgrade() {
        if(window.app.$data.gold >= this.price) {
            window.app.$data.gold -= this.price;
            this.level++;
            this.price = Math.round(this.price * this.priceIncrease*100)/100;
            this.onUpgrade();
        }
    }
}