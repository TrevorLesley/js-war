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

    // return ${ values[this.value] } of ${
    //     suits[this.suit][0].toUpperCase()${ suits[this.suit].slice(1) }
    // }
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



}

const game = new Game();

/* const deck = new Deck(); */
