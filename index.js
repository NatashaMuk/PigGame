'use strict';

const playerOne = document.querySelector('.player-0');
const playerTwo = document.querySelector('.player-1');

const scoreP1 = document.querySelector('.score-0');
const scoreP2 = document.querySelector('.score-1');

const dice = document.querySelector('.dice-img');
const container = document.querySelector('.container');
const icons = document.querySelectorAll('.icon');
const scoreWrapper = document.querySelectorAll('.current-score-wrapper');
const btns = document.querySelectorAll('.btn');

const rollBtn = document.querySelector('.btn-roll');
const newBtn = document.querySelector('.btn-new');
const holdBtn = document.querySelector('.btn-hold');
const gameInfoBtn = document.querySelector('.btn-gameInfo');
const closeBtn = document.querySelector('.close');

const colourList = ['#e23d20', '#127712', '#860586', '#da082b', '#07806b'];
const colours = document.querySelectorAll('.colour-item');

const modal = document.querySelector('.modal');

let heldScores, score, continueGame;
let activePlayer = 0;
const jsConfetti = new JSConfetti();

const initGame = function () {
  dice.classList.add('hidden');
  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  score = 0;
  heldScores = [0, 0];
  playerOne.classList.add('player-active');
  playerTwo.classList.remove('player-active');
  playerOne.classList.remove('player-winner');
  playerTwo.classList.remove('player-winner');
  document.querySelector(`.current-${activePlayer}`).textContent = 0;
  document.querySelector(`.name-${activePlayer}`).textContent =
    activePlayer === 0 ? 'Player 1' : 'Player 2';

  continueGame = true;
};

initGame();

function switchPlayer() {
  score = 0;
  document.querySelector(`.current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle('player-active');
  playerTwo.classList.toggle('player-active');
}

function confetti() {
  jsConfetti.addConfetti({
    confettiColors: [
      '#e23d20',
      '#127712',
      '#860586',
      '#da082b',
      '#07806b',
      '#1086ad',
    ],
  });
}

function checkWinner() {
  confetti();
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.add('player-winner');
  document.querySelector(`.name-${activePlayer}`).textContent = 'WINNER';
}

rollBtn.addEventListener('click', function () {
  if (continueGame) {
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    dice.src = `images/dice-${diceNumber}.png`;
    dice.classList.remove('hidden');

    if (diceNumber !== 1) {
      score += diceNumber;
      document.querySelector(`.current-${activePlayer}`).textContent = score;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (continueGame) {
    dice.classList.add('hidden');
    heldScores[activePlayer] += score;
    document.querySelector(`.score-${activePlayer}`).textContent =
      heldScores[activePlayer];
    score = 0;
    if (heldScores[activePlayer] >= 100) {
      checkWinner();
      continueGame = false;
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', function () {
  initGame();
});

//change colours
colours.forEach(function (colour) {
  colour.addEventListener('click', function () {
    const colourSelected = this.id;
    container.style.backgroundColor =
      colourList[colourSelected.substring(4, 5) - 1];

    for (let i = 0; i < 2; i++) {
      scoreWrapper[i].style.backgroundColor =
        colourList[colourSelected.substring(4, 5) - 1];
    }

    for (let i = 0; i < 4; i++) {
      icons[i].style.color = colourList[colourSelected.substring(4, 5) - 1];

      btns[i].style.border = `2px solid ${
        colourList[colourSelected.substring(4, 5) - 1]
      }`;
    }
  });
});

//Modal
gameInfoBtn.addEventListener('click', function () {
  modal.style.display = 'block';
  container.style.filter = 'blur(6px)';
});

closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
  container.style.filter = 'none';
});
