export default class Enemy {
    minGold;
    maxGold;
    minMaxHealth;
    maxMaxHealth;

    maxHealth;
    health;

    attackSpeed;
    damage;

    attack;

    svgsrc;
    name;

    constructor(mig, mag, mimah, mamah, mah, h, ats, dam, svgsrc, name){
        this.minGold = mig;
        this.maxGold = mag;
        this.minMaxHealth = mimah;
        this.maxMaxHealth = mamah;
        this.maxHealth = mah;
        this.health = h;
        this.attackSpeed = ats;
        this.damage = dam;
        this.svgsrc = svgsrc;
        this.name = name;

        this.attack = setInterval(function(){
            console.log(dam);
            window.app.health -= parseInt(dam);
            window.app.hurt();
        }, this.attackSpeed*1000)
    }

    onDelete(){
        window.clearInterval(this.attack);
    }
}