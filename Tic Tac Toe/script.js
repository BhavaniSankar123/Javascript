// script.js
const startBtn = document.querySelector('button');
const main = document.querySelector('.main');
const container = document.querySelector('.container');

let currentPlayer = '⭕';
let gameActive = false;
let scores = { '⭕': 0, '❎': 0 };

const scoreBoard = document.createElement('div');
scoreBoard.className = 'scoreboard';
scoreBoard.innerHTML = `
  <p><span id="score-xo">⭕</span>: <span id="score-o">0</span> | <span id="score-❎">❎</span>: <span id="score-x">0</span></p>
`;
container.appendChild(scoreBoard);

startBtn.addEventListener('click', () => {
  if (!gameActive) {
    initGame();
    startBtn.textContent = 'Reset';
  } else {
    resetGame();
    startBtn.textContent = 'Start';
  }
});

function initGame() {
  gameActive = true;
  main.innerHTML = '';
  currentPlayer = '⭕';
  for (let i = 0; i < 9; i++) {
    const box = document.createElement('div');
    box.className = 'box';
    box.setAttribute('data-index', i);
    box.addEventListener('click', handleBoxClick);
    main.appendChild(box);
  }
  updateTurnMessage();
}

function handleBoxClick(e) {
  const box = e.target;
  if (box.textContent !== '' || !gameActive) return;
  box.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    scores[currentPlayer]++;
    updateScores();
    showResult(`${currentPlayer} wins the match!`);
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    showResult("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === '⭕' ? '❎' : '⭕';
  updateTurnMessage();
}

function checkWin(player) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  const boxes = document.querySelectorAll('.box');
  return winConditions.some(comb =>
    comb.every(index => boxes[index].textContent === player)
  );
}

function checkDraw() {
  const boxes = document.querySelectorAll('.box');
  return Array.from(boxes).every(box => box.textContent);
}

function resetGame() {
  gameActive = false;
  main.innerHTML = '';
  document.querySelector('.message')?.remove();
  startBtn.textContent = 'Start';
}

function showResult(message) {
  const msg = document.createElement('div');
  msg.className = 'message';
  msg.innerHTML = `<h2>${message}</h2>`;
  container.appendChild(msg);

  setTimeout(() => {
    msg.remove();
    initGame();
  }, 1500);
}

function updateScores() {
  document.getElementById('score-o').textContent = scores['⭕'];
  document.getElementById('score-x').textContent = scores['❎'];
}

function updateTurnMessage() {
  document.querySelector('.turn-msg')?.remove();
  const msg = document.createElement('p');
  msg.className = 'turn-msg';
  msg.innerHTML = `Current Turn: <strong>${currentPlayer}</strong>`;
  container.appendChild(msg);
}
