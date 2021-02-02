var app = new Vue({
    el: '#app',
    data: {
        damage: 1,
        gold: 0,
        critChance: 10,
        //create a object array for upgrades instead of creating individual variables for each upgrade?? idk how to do that tho
        enhanceUpgrade: new Upgrade(10,2),
        enemy: {
            maxHealth: 10,
            health: 10
        }
    },
    methods: {
        //These things could also fit in the html but i've put them here for the future
        attackEnemy: function() {
            this.enemy.health -= Math.random()*11 < this.critChance ? this.damage : this.damage*2;
            if(this.enemy.health <= 0) {
                this.gold++;
                this.generateNewEnemy();
            }
        },
        generateNewEnemy: function() {
            this.enemy.maxHealth = Math.floor(Math.random() * 10) + 1;
            this.enemy.health = this.enemy.maxHealth;
        },
        enhanceWeapon: function() {
            if(this.gold >= this.enhanceUpgrade.getPrice()) {
                this.enhanceUpgrade.upgrade();
                this.damage = this.enhanceUpgrade.getLevel();
            }
        }
    }
});