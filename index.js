const vue = new Vue({
    el: "#app",
    data: {
        name: "Furkan",
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
            if (this.checkWin()) return;

            this.monsterHealth -= this.calculateDamage(2, 5);
            this.userHealth -= this.calculateDamage(2, 6);

            this.attackLog.push({ userAttack, monsterAttack });
        },
        specialAttack() {
            if (this.checkWin()) return;

            this.monsterHealth -= this.calculateDamage(5, 10);
            this.userHealth -= this.calculateDamage(2, 6);

            this.attackLog.push({ userAttack, monsterAttack });

            this.remSpecialAttack--;
        },
        heal() {
            if (this.checkWin()) return;

            this.userHealth +=
                this.calculateHealth(3, 10) - this.calculateDamage(2, 6);

            this.attackLog.push({ userAttack: 0, monsterAttack, healthGained });
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
                if (confirm("Try Again 🎉")) {
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
