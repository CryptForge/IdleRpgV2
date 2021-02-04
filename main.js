//Enemies
import {default as Enemy} from "./Monsters/Enemy.js";
import {default as Slime, Rat} from "./Monsters/all.js";

import {default as Upgrade} from "./modules/Upgrade.js";
import {default as Weapon} from "./modules/Weapon.js";

Vue.component('current-enemy', {
    template: 
    `
    <div class="enemyDiv">
        <object :data="enemy.svgsrc" type="image/svg+xml" class="enemySprite"></object>
        <span>{{enemy.name}} {{enemy.health}}/{{enemy.maxHealth}}</span>
    </div>
    `,
    methods: {
        
    },
    props: [
        "enemy"
    ],
});

Vue.component('shop-item', {
    template: 
    `
    <div class="shopitem" v-on:click="item.upgrade()" v-if="item.unlocked" >
        <span class="shopitem-price">
            <i class="fas fa-dollar-sign"></i>
            {{item.price}}
        </span>
        <span class="shopitem-title">
            {{item.Title}}
        </span>
        <span class="shopitem-desc">
            {{item.Description}}
        </span>
        <span class="shopitem-level">
            {{item.level}}
        </span>
    </div>
    `,
    props: [
        "item"
    ],
    methods: {
        
    }
});

var app = window.app = new Vue({
    el: '#app',
    data: {
        health: 100,
        gold: 0,
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
        getGold: function(){
            return Math.round(this.gold*10)/10
        },
        possibleEnemies: [Slime, Rat],
        enemy: new Enemy(1,3,3,6,6,6,7,8, "./Monsters/slime.svg", "Slime"),
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
        handbookOpen: false,
    },
    mounted: function(){
        this.stats[1].value = this.currentWeapon.attackSpeed;
        this.stats[0].value = this.currentWeapon.damage;

        this.generateEnemy();
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
        handbookclick: function() {
            this.handbookOpen = !this.handbookOpen;
            if (this.handbookOpen){
                this.$refs["handBookButton"].classList.add("activeHandbook");
            } else {
                this.$refs["handBookButton"].classList.remove("activeHandbook");
            }
        },
        generateEnemy: function(){
            this.enemy.onDelete();
            this.enemy = new this.possibleEnemies[Math.floor(Math.random() * this.possibleEnemies.length)]();
        },
        hurt: function() {
            this.$refs["hurtoverlay"].className ="hurtAnimation";
            setTimeout(()=>{
                this.$refs["hurtoverlay"].classList.remove("hurtAnimation");
            }, 2000);
        },
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
                this.generateEnemy();
            }
            this.canAttack = false;
            this.$refs["attackOverlay"].className = "AccentColor attackButton attackoverlay-in"
            setTimeout(()=>{
                this.canAttack = true;
                this.$refs["attackOverlay"].className = "AccentColor attackButton attackoverlay-out";
            },this.currentWeapon.attackSpeed * 1000);
        },
    }
});

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + Math.floor(min);
  }
