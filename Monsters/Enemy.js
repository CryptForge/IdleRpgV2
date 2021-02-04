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
    desc;

    constructor(minimum_gold,
                maximum_gold,
                minimum_health,
                maximum_health,
                attack_speed,
                damage,
                svg_source,
                name,
                description){
        this.minGold = minimum_gold;
        this.maxGold = maximum_gold;
        this.minMaxHealth = minimum_health;
        this.maxMaxHealth = maximum_health;
        this.maxHealth = maximum_health
        this.health = maximum_health
        this.attackSpeed = attack_speed;
        this.damage = damage;
        this.svgsrc = svg_source;
        this.name = name;
        this.desc = description;

        this.attack = setInterval(function(){
            console.log(damage);
            window.app.health -= parseInt(damage);
            window.app.hurt();
        }, this.attackSpeed*1000)
    }

    onDelete(){
        window.clearInterval(this.attack);
    }
}