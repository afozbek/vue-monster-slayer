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
        attack(e) {
            let userAttack = Math.max(Math.floor(Math.random() * 5) + 1, 2); // 2-5 damage
            let monsterAttack = Math.max(Math.floor(Math.random() * 6) + 1, 2); //2-6 damage

            this.monsterHealth -= userAttack;
            this.userHealth -= monsterAttack;

            this.attackLog.push({ userAttack, monsterAttack });

            if (this.monsterHealth <= 0) {
                if (confirm("Wow You Won 🎉")) {
                    this.startGame();
                } else {
                    this.gameStarted = false;
                }
            }

            if (this.userHealth <= 0) {
                if (confirm("Try Again 🎉")) {
                    this.startGame();
                } else {
                    this.gameStarted = false;
                }
            }
        },
        specialAttack() {
            console.log("Special Attack");
            let userAttack = Math.max(Math.floor(Math.random() * 10) + 1, 5); // 5-10 damage
            let monsterAttack = Math.max(Math.floor(Math.random() * 6) + 1, 2); //2-6 damage

            this.monsterHealth -= userAttack;
            this.userHealth -= monsterAttack;

            this.attackLog.push({ userAttack, monsterAttack });

            this.remSpecialAttack--;

            // CHECK FOR WIN RESULTS
            if (this.monsterHealth <= 0) {
                if (
                    confirm("Wow You Won 🎉. Do you want to restart the game??")
                ) {
                    this.startGame();
                } else {
                    this.gameStarted = false;
                }
            }

            if (this.userHealth <= 0) {
                if (confirm("Try Again 😥")) {
                    this.startGame();
                } else {
                    this.gameStarted = false;
                }
            }
        },
        heal() {
            let healthGained = Math.max(Math.floor(Math.random() * 10) + 1, 3); // 3-10 health gained
            let monsterAttack = Math.max(Math.floor(Math.random() * 6) + 1, 2); //2-6 damage

            this.userHealth += healthGained - monsterAttack;

            this.attackLog.push({ userAttack: 0, monsterAttack, healthGained });
        },
        giveUp() {
            this.userHealth = 100;
            this.monsterHealth = 100;
            this.gameStarted = false;
            this.remSpecialAttack = 3;
            this.attackLog = [];
        }
    }
});
