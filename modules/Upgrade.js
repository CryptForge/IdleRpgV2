export default class Upgrade {
    level = 1;
    price;
    priceIncrease;
    Title;
    Description;
    unlocked;

    constructor(title, desc, price, priceIncrease, onUpgrade, unlocked = true) {
        this.Title = title;
        this.Description = desc;
        this.price = price;
        this.priceIncrease = priceIncrease;
        this.onUpgrade = onUpgrade;
        this.unlocked = unlocked;
    }

    upgrade(item) {
        if(window.app.$data.gold >= item.price) {
            window.app.$data.gold -= item.price;
            this.level++;
            item.price = Math.round(item.price * item.priceIncrease*100)/100;
            item.onUpgrade();
        }
    }
}