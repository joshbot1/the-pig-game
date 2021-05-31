'use strict';
//selecting the elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
//initial conditions
score0El.textContent = 0;
score1El.textContent = 0;

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    //displaying dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // console.log(dice);

    //check if the roll is 1
    if (dice !== 1) {
      currentScore += dice;
      // currentScore0El.textContent = currentScore;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } //if the roll is 1 change the active player
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //adding the score to array
    scores[activePlayer] += currentScore;
    // console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check constraint if the score is >= 100

    if (scores[activePlayer] >= 15) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //switch player
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
