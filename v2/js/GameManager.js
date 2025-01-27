const GameManager = {
    appContainer: null,
    hasFlippedCard: false,
    lockBoard: false,
    firstCard: null,
    secondCard: null,
    matchedPairs: 0,
    totalPairs: 6,
    cards: [],

    resetBoard() {
        this.appContainer.innerHTML = "";

        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = false;
        this.secondCard = false;
        this.matchedPairs = false;
        this.cards = [];

        this.initGame();
    },
    _createLayout() {
        const header = document.createElement("header");

        const title = document.createElement("h1");
        title.textContent = "Memory Game";
        header.appendChild(title);

        const resetBtn = document.createElement("button");
        resetBtn.id = "reset-btn";
        resetBtn.textContent = "Reset Game";
        header.appendChild(resetBtn);

        resetBtn.addEventListener("click", () => this.resetBoard());

        const gameContainer = document.createElement("div");
        gameContainer.id = "game-container";

        this.appContainer.appendChild(header);
        this.appContainer.appendChild(gameContainer);
    },
    _shuffleValues(values) {
        for(let i = 0; i < values.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [values[i], values[j]] = [values[j], values[i]];
        }
    },
    _initializeCards() {
        const values = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓'];

        // create pairs
        const cardValues = [...values, ...values];

        this._shuffleValues(cardValues);

        this.cards = cardValues.map(value => Card(value));
    },
    _unflipCards() {
        this.lockBoard = true;
        setTimeout(() => {
            this.firstCard.unflip();
            this.secondCard.unflip();

            this.firstCard = null;
            this.secondCard = null;
            this.lockBoard = false;
        }, 1000);
    },
    _disableCards() {
        this.firstCard.setMatched();
        this.secondCard.setMatched();

        this.firstCard = null;
        this.secondCard = null;
    },
    _checkForMatch() {
        const isMatch = this.firstCard.value === this.secondCard.value;
        console.log(isMatch);
        if(isMatch) {
            this._disableCards();
            this.matchedPairs++;
            if(this.matchedPairs === this.totalPairs) {
                setTimeout(() => {
                    alert("Congrats, you matched them all!");
                }, 500);
            }
        } else {
            this._unflipCards();
        }
    },
    _handleCardFlip(cardObj) {
        if(this.lockBoard) return;

        cardObj.flip();

        if(!this.hasFlippedCard) {
            this.hasFlippedCard = true;
            this.firstCard = cardObj;
            return;
        }

        this.hasFlippedCard = false;
        this.secondCard = cardObj;

        this._checkForMatch();

    },
    _renderCards() {
        const container = document.getElementById("game-container");

        this.cards.forEach(card => {
            const cardElem = card.createDOMElement(this._handleCardFlip.bind(this));
            container.appendChild(cardElem);
        })
    },
    initGame() {
        this.appContainer = document.getElementById("app");
        this.appContainer.innerHTML = "";

        this._createLayout();

        this._initializeCards();

        this._renderCards();
    }
}