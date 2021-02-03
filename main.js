import {default as Upgrade} from "./modules/Upgrade.js";
import {default as Weapon} from "./modules/Weapon.js";

var app = window.app = new Vue({
    el: '#app',
    data: {
        gold: 999999,
        canAttack: true,
        currentWeapon: new Weapon("wooden sword",1,1.2,5),
        upgrades: {
            enhanceWeapon: new Upgrade(
                "Sharpen",
                "Makes the weapon even sharper! (+2 damage)",
                5,1.25,
                () => {window.app.increaseDamage(2);window.app.upgrades.luck.unlocked = true;}
            ),
            luck: new Upgrade(
                "Luck",
                "Increases your luck... somehow (more gold drops)",
                10,1.5,
                () => {window.app.$data.enemy.minGold++; window.app.$data.enemy.maxGold++},
                false
            )
        },
        enemy: {
            minGold: 1,
            maxGold: 2,
            minMaxHealth: 1,
            maxMaxHealth: 10,

            maxHealth: 10,
            health: 10
        },
        getGold: function(){
            return Math.round(this.gold*10)/10
        },
        stats: [
            {
                title: "Weapon Damage",
                desc: "Damage dealt to the enemy",
                value: "",
            },
            {
                title: "Attack Speed",
                desc: "The speed at which you can swing your weapon",
                value: "",
            },
        ],
    },
    mounted: function(){
        this.stats[1].value = this.currentWeapon.attackSpeed;
        this.stats[0].value = this.currentWeapon.damage;
    },
    watch: {
        "currentWeapon.attackSpeed": {
            handler:function (val, oldval) {
                this.stats[1].value = val;
            },
            deep:true,
        },
        "currentWeapon.damage": {
            handler:function (val, oldval) {
                this.stats[0].value = val;
            },
            deep:true,
        },
    },
    methods: {
        increaseDamage: function(damage) {
            this.currentWeapon.damage += damage;
        },
        attackEnemy: function() {
            if(!this.canAttack) return;
            this.enemy.health -= Math.random()*11 < (this.currentWeapon.critChance+1) ? this.currentWeapon.damage : this.currentWeapon.damage*2;
            if(this.enemy.health <= 0) {
                this.gold += randomInteger(this.enemy.minGold,this.enemy.maxGold);
                this.enemy.maxMaxHealth += 0.5;
                this.enemy.minMaxHealth += 0.25;
                this.generateNewEnemy();
            }
            this.canAttack = false;
            this.$refs["attackOverlay"].className = "attackoverlay-in"
            setTimeout(()=>{
                this.canAttack = true;
                this.$refs["attackOverlay"].className = "attackoverlay-out";
            },this.currentWeapon.attackSpeed * 1000);
        },
        generateNewEnemy: function() {
            this.enemy.maxHealth = randomInteger(this.enemy.minMaxHealth,this.enemy.maxMaxHealth);
            this.enemy.health = this.enemy.maxHealth;
        }
    }
});

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + Math.floor(min);
  }
