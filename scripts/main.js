(function () {
    'use strict';

    //  This is the constructor for the cards.

    const Card = function ({ value, suit } = {}) {
        this.value = value;
        this.suit = suit;
    }

    // Below is the protoype chain to define the suits and values, and print the value of the card.

    Card.prototype.print = function () {
        const suits = [
            'spades',
            'diamonds',
            'clubs',
            'hearts',
        ];

        const values = [
            null,
            null,
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            'J',
            'Q',
            'K',
            'A',
        ]

        return `${values[this.value]} of ${suits[this.suit][0].toUpperCase()}${suits[this.suit].slice(1)}
}`;
    }

    //==========================================

    // Below are the constructors for the deck, players, and individual matches.

    const Deck = function () {
        this.cards = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 2; j <= 14; j++) {
                this.cards.push(new Card({ suit: i, value: j }));
            }
        }
    }

    const Player = function ({ name } = {}) {
        this.name = name;
        this.hand = [];
        this.cardCount = 0;
        this.draw = null;
    }

    const Game = function () {
        const player1 = prompt(`Enter player 1 name: `);
        const player2 = prompt(`Enter player 2 name: `);

        this.player1 = new Player({ name: player1 });
        this.player2 = new Player({ name: player2 });
        this.deck = new Deck();
        this.pot = [];

    }


    //==========================================

    // Below are the prototypes for the rules of the game to be used per match.

    Game.prototype.shuffle = function (deck) {
        let i = deck.length, j, temp;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
        this.player1.cardCount = this.player1.hand.length;
        this.player2.cardCount = this.player2.hand.length;
    }

    Game.prototype.deal = function () {
        this.shuffle(this.deck.cards);

        this.player1.hand = this.deck.cards.filter(function (item, index) {
            return !(index % 2);
        });

        this.player2.hand = this.deck.cards.filter(function (item, index) {
            return index % 2;
        });
    }

    Game.prototype.compare = function () {
        let player1Card = game.player1.hand[game.player1.hand.length - 1];
        let player2Card = game.player2.hand[game.player2.hand.length - 1];

        if (player1Card.number > player2Card.number) {
            game.player1.hand.unshift(player2Card);
            console.log(`${player1} drew a ${player1Card.number}, and ${player2} drew a ${player2Card.number}; ${player1} wins the hand.`);
            a = game.player1.hand.pop();
            game.player1.hand.unshift(a);
            game.player2.hand.pop();
        } else if (player1Card.number < player2Card.number) {
            game.player2.hand.unshift(player1Card);
            console.log(`${player1} drew a ${player1Card.number}, and ${player2} drew a ${player2Card.number}; ${player2} wins the hand.`);
            a = game.player2.hand.pop();
            game.player2.hand.unshift(a);
            game.player1.hand.pop();
        } else if (player1Card.number == player2Card.number) {
            console.log(`Cards are equal; it's war!`);
            for (i = 0; i < 3; i++) {
                a = game.player1.hand.pop();
                b = game.player2.hand.pop();
                game.pot.push(a);
                game.pot.push(b);
            } if (game.pot[2].number > game.pot[5].number) {
                console.log(`${player1} wins the war.`);
                game.player1.hand.push(game.pot[0], game.pot[1], game.pot[2], game.pot[3], game.pot[4], game.pot[5]);
                game.pot = [];
            } else if (game.pot[2].number < game.pot[5].number) {
                game.player2.hand.push(game.pot[0], game.pot[1], game.pot[2], game.pot[3], game.pot[4], game.pot[5]);
                game.pot = [];
            } else if (game.pot[2].number === game.pot[5].number) {
                this.compare();
                game.pot = [];
            }
        }
    }

    Game.prototype.draw = function () {
        const player1Card = this.player1.hand.shift();
        const player2Card = this.player2.hand.shift();

        this.player1.cardCount -= 1;
        this.player2.cardCount -= 1;

        if (!this.player1.cardCount) {
            this.shuffle(this.player1.hand);
        }

        if (!this.player2.cardCount) {
            this.shuffle(this.player2.hand);
        }

        this.player1.draw = player1Card;
        this.player2.draw = player2Card;

        this.pot = [player1Card, player2Card, ...this.pot];
        console.log(`${this.player1.name} draws a ${player1Card.print()}.`)
        console.log(`${this.player2.name} draws a ${player2Card.print()}.`)


    }


    Game.prototype.play = function () {
        this.shuffle(this.deck.cards);
        this.deal();

        console.log(`Let's play War!`);
        console.log(`\n`);

        game.draw();
        game.compare();

    }

    const game = new Game();

    game.play();

})();