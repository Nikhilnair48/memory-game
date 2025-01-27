// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const restartButton = document.getElementById('restart-button');
  
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;
  
    // Initialize Game
    shuffleCards();
    addCardEventListeners();
  
    // Restart Button Event Listener
    restartButton.addEventListener('click', resetGame);
  
    // Function to Shuffle Cards
    function shuffleCards() {
      // Shuffle using Fisher-Yates algorithm
      const shuffledCards = Array.from(cards);
      for (let i = shuffledCards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        console.log(j + " " + i);
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
      }
      // Append shuffled cards to the container
      const gameContainer = document.getElementById('game-container');
      shuffledCards.forEach(card => gameContainer.appendChild(card));
    }
  
    // Function to Add Event Listeners to Cards
    function addCardEventListeners() {
      cards.forEach(card => card.addEventListener('click', flipCard));
    }
  
    // Function to Remove Event Listeners from Cards
    function removeCardEventListeners() {
      cards.forEach(card => card.removeEventListener('click', flipCard));
    }
  
    // Flip Card Function
    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;
  
      this.classList.add('flip');
  
      if (!hasFlippedCard) {
        // First Click
        hasFlippedCard = true;
        firstCard = this;
        return;
      }
  
      // Second Click
      secondCard = this;
      checkForMatch();
    }
  
    // Check if Two Selected Cards Match
    function checkForMatch() {
      let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  
      if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === 6) {
          setTimeout(() => {
            alert('Congratulations! You found all pairs!');
            removeCardEventListeners();
          }, 500);
        }
      } else {
        unflipCards();
      }
    }
  
    // Disable Cards if They Match
    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
  
      resetBoard();
    }
  
    // Unflip Cards if They Don't Match
    function unflipCards() {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
  
        resetBoard();
      }, 1000);
    }
  
    // Reset Board State
    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }
  
    // Reset Game Function
    function resetGame() {
      // Unflip all cards
      cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
      });
  
      // Reset variables
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
      matchedPairs = 0;
  
      // Shuffle Cards
      shuffleCards();
    }
  });
  