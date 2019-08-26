const vue = new Vue({
    el: "#app",
    data: {
        userHealth: 100,
        monsterHealth: 100,
        gameStarted: false,
        remSpecialAttack: 3,
        attackLog: []
    },
    computed: {
        getUserStyle() {
            return {
                "background-color": "green",
                margin: 0,
                color: "white",
                width: this.userHealth <= 0 ? 0 : this.userHealth + "%"
            };
        },
        getMonsterStyle() {
            return {
                "background-color": "green",
                margin: 0,
                color: "white",
                width: this.monsterHealth <= 0 ? 0 : this.monsterHealth + "%"
            };
        }
    },
    methods: {
        startGame() {
            this.gameStarted = true;
            this.userHealth = 100;
            this.monsterHealth = 100;
            this.remSpecialAttack = 3;
            this.attackLog = [];
        },
        attack() {
            let userAttack = this.calculateDamage(4, 7);

            this.monsterHealth -= userAttack;

            let monsterAttack = this.monsterAttack(5, 10);

            this.attackLog.push({ userAttack, monsterAttack });

            if (this.checkWin()) return;
        },
        specialAttack() {
            let userAttack = this.calculateDamage(8, 12);
            this.monsterHealth -= userAttack;

            let monsterAttack = this.monsterAttack(5, 10);

            this.attackLog.push({ userAttack, monsterAttack });

            this.remSpecialAttack--;

            if (this.checkWin()) return;
        },
        monsterAttack(min, max) {
            let attack = this.calculateDamage(min, max);

            this.userHealth -= attack;

            return attack;
        },
        heal() {
            let healthGained = this.calculateHealth(7, 10);
            console.log("TCL: heal -> healthGained", healthGained);

            let monsterAttack = this.monsterAttack(5, 10);

            this.userHealth += healthGained;

            this.attackLog.push({ userAttack: 0, monsterAttack, healthGained });

            if (this.userHealth >= 100) {
                this.userHealth = 100;
            }

            if (this.checkWin()) return;
        },
        giveUp() {
            this.userHealth = 100;
            this.monsterHealth = 100;
            this.gameStarted = false;
            this.remSpecialAttack = 3;
            this.attackLog = [];
        },
        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        calculateHealth(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                if (confirm("Wow You Won 🎉")) {
                    this.startGame();
                } else {
                    this.gameStarted = false;
                }
                return true;
            } else if (this.userHealth <= 0) {
                if (confirm("Try Again 😥")) {
                    this.startGame();
                } else {
                    this.gameStarted = false;
                }
                return true;
            }

            return false;
        }
    }
});
