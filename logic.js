function randValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const logic = Vue.createApp({
    data() {
        return {
            currentRound: 0,
            playerHealth: 100,
            opponentHealth: 100,
            battleLog: [],
            gameResult: null,
        }
    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.opponentHealth <= 0) {
                this.playerHealth = 0;
                this.gameResult = "It's a Draw!";
            } else if (value <= 0) {
                this.playerHealth = 0;
                this.gameResult = "You Lost!";
            } else if (value > 100) {
                this.playerHealth = 100;
            }
        },
        opponentHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.opponentHealth = 0;
                this.gameResult = "It's a Draw!";
            } else if (value <= 0) {
                this.opponentHealth = 0;
                this.gameResult = "You Won!";
            }
        }
    },

    computed: {
        playerBar() {
            // We could do heathBar problem this way; I've solved it in watcher;
            // if (this.playerHealth < 0) {
            //     return {width: '0%'};
            // }
            return {width: this.playerHealth + '%'}
        },
        opponentBar() {
            // if (this.opponentHealth < 0) {
            //     return {width: '0%'};
            // }
            return {width: this.opponentHealth + '%'}
        },
        mayUseSpecial() {
            return this.currentRound % 3 !== 0;
        }
    },

    methods: {
        restart() {
            this.currentRound = 0;
            this.playerHealth = this.opponentHealth = 100;
            this.gameResult = null;
        },
        // TODO: Create logic to block actions if gameResult is truthy or I can leave v-if(else)='gameResult' in HTML!
        // blockActions() {},
        defaultAttack() {
            this.currentRound++;
            let damage = randValue(5, 12);
            this.opponentHealth -= damage;
            this.attackPlayer();
        },
        attackPlayer() {
            let damage = randValue(8, 15);
            this.playerHealth -= damage;
        },
        specialAttack() {
            this.currentRound++;
            let damage = randValue(10, 25);
            this.opponentHealth -= damage;
            this.attackPlayer();
        },
        heal() {
            this.currentRound++;
            let healValue = randValue(8, 20);
            this.playerHealth += healValue;
            this.attackPlayer();
        },
        surrender() {
            this.gameResult = "You Lost!";
        }
    }
});

logic.mount('#game');