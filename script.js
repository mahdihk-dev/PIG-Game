'use strict';

// Variables (selecting elements)
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// ---------------------------------------------------

let scores, currentScore, activePlayer, playing;
// initialization function
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden')
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
};
init();

// ----------------------------------------------------------

// switch player function
const switchPlayer = function () {
  // switch player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // toggle methode will add the (class) if it does not exist among element classes and if it exists already it will remove it
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// -----------------------------------------------

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./dice-${dice}.png`;

    // check for dice number ,
    if (dice !== 1) {
      // add dice number to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if === 1 switch player
      switchPlayer();
    }
  }
});

// -------------------------------------------------

// Holding The Scores
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to the score of the active Player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >= 100
    if (scores[activePlayer] >= 50) {
      // Finish the game
      playing = false;
      // ----------------------------------------------
      // ++ we can also hide the buttons instead of disabling them using state variables
      btnHold.classList.add('hidden');
      btnRoll.classList.add('hidden');
      // ----------------------------------------------
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // hiding the dice after winning
      diceEl.classList.add('hidden');
    } else {
      // if not, switch to the other player
      switchPlayer();
    }
  }
});

// ---------------------------------------------------
// resetting the game functionality
btnNew.addEventListener('click', init);
