import {default as Upgrade} from "./modules/Upgrade.js";
import {default as Weapon} from "./modules/Weapon.js";

var app = new Vue({
    el: '#app',
    data: {
        damage: 1,
        gold: 0,
        canAttack: true,
        currentWeapon: new Weapon("wooden sword",1,1.2,5),
        upgrades: {
            "enhanceWeapon": new Upgrade(5,2, () => {console.log("yeet")}),
        },
        enemy: {
            maxHealth: 10,
            health: 10
        },
    },
    mounted: function() { // basically window.onload for vue.js
        this.prepareShop();
    },
    methods: {
        prepareShop: function() {
            
        },
        openShop: function() {

        },
        //These things could also fit in the html but i've put them here for the future
        attackEnemy: function() {
            if(!this.canAttack) return;
            this.enemy.health -= Math.random()*11 < (this.currentWeapon.critChance+1) ? this.damage : this.damage*2;
            if(this.enemy.health <= 0) {
                this.gold += Math.floor(Math.random() * 2) + 1;
                this.generateNewEnemy();
            }
            this.canAttack = false;
            setTimeout(this.resetAttackCooldown,this.currentWeapon.attackSpeed * 1000);
        },
        generateNewEnemy: function() {
            this.enemy.maxHealth = Math.floor(Math.random() * 10) + 1;
            this.enemy.health = this.enemy.maxHealth;
        },
        enhanceWeapon: function() {
            if(this.gold >= this.enhanceUpgrade.price) {
                this.gold -= this.enhanceUpgrade.price;
                this.enhanceUpgrade.upgrade();
                this.damage = this.enhanceUpgrade.level;
            }
        },
        resetAttackCooldown: function() {
            this.canAttack = true;
        }
    }
});