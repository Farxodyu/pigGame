'use strict';
// element selection
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const diceElement = document.querySelector('.dice');
const bntNEW = document.querySelector('.btn--new');
const bntHold = document.querySelector('.btn--hold');
const bntRoll = document.querySelector('.btn--roll');
const playerZero = document.querySelector('.player--0');
const playerOne = document.querySelector('.player--1');
// Game initial conditionals
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

const totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

const switchActive = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerZero.classList.toggle('player--active');
  playerOne.classList.toggle('player--active');
};

//Roll
bntRoll.addEventListener('click', function() {
  if (isPlaying) {
    //1. Generate a random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    //2. Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;

    //3. If the number is 1, witch he next player, if not -add
    if (diceNumber !== 1) {
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      currentScore += diceNumber;
    } else {
      switchActive();
    }
  }
});

bntHold.addEventListener('click', function() {
  if (isPlaying) {
    //1. add current score  to total score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`)
      .textContent = totalScores[activePlayer];
    diceElement.classList.add('hidden');

    //2. if total score of active player >= 100, active player if not - switch active player
    if (totalScores[activePlayer] >= 20) {
      isPlaying = false;
      document.querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchActive();
    }
  }
});