const container = document.getElementById('main');
const cardslength = 12;
let cards = [];
var total = 0;
var game = true;

const controls = document.querySelector('.controls');
const moves = document.querySelector('.moves');
const timer = document.querySelector('.timer');
const start = document.querySelector('button');
const win = document.querySelector('.win');
const clickstart = document.querySelector('.clickstart');

const print = clickstart.innerHTML;

let totalTime = 0;
let totalFlips = 0;
let loop = null;

start.addEventListener('click', () => {
  totalTime = 0;
  totalFlips = 0;
  container.innerHTML = "";
  board();

  if (!loop) {
    clickstart.innerHTML = "";
    loop = setInterval(() => {
      totalTime++;
      moves.innerText = `${totalFlips} moves`
      timer.innerText = `time: ${totalTime} sec`
    }, 1000);
    start.textContent = "Reset";
    game = false;
  }
  else {
    clearInterval(loop);
    moves.innerText = "0 moves";
    timer.innerText = "time: 0 sec";
    loop = null;
    start.textContent = "Start";
    game = true;
    clickstart.innerHTML = print;
  }

});


let previousShownCard = undefined;

const board = () => {
  if (game) {
  let icons = [
    'Assets/c++.png',
    'Assets/python.png',
    'Assets/javascript.png',
    'Assets/java.png',
    'Assets/R.png',
    'Assets/C.png'
  ];

  // Copy the icons again so we can use them in the cards
  icons.push(...icons);
  // Shuffle the icons
  for (let i = 0; i < 100; i++) {

    const idx1 = Math.floor(Math.random() * icons.length);
    const idx2 = Math.floor(Math.random() * icons.length);

    const temp = icons[idx1];
    icons[idx1] = icons[idx2];
    icons[idx2] = temp;
  }
  
    for (let i = 0; i < cardslength; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `<div class="front">
                      <img src="${icons[i]}"/>
                    </div>
                    <div class="back">
                      <small>Click me</small>
                    </div>`;


      card.addEventListener('click', () => {
        if (!card.classList.contains('show')) {
          card.classList.add('show');

          if (!previousShownCard)
            previousShownCard = card;
          else {
            const iconOne = previousShownCard.querySelector('img');

            const iconTwo = card.querySelector('img');

            if (iconOne.src !== iconTwo.src) {
              const temp = previousShownCard;
              setTimeout(() => {
                temp.classList.remove('show');
                card.classList.remove('show');
              }, 1000);
            }
            else
              total += 1;
            previousShownCard = undefined;
            totalFlips++;
          }

        }
        if (total == 6)
          printwin();
      });

      cards.push(card);

      container.appendChild(card);

    }
  }
  game = false;
}

const printwin = () => {

  setTimeout(() => {

    container.innerHTML = `
          <span class="win-text">
              You won!!!<br />
              with <span class="highlight">${totalFlips}</span> moves<br />
              under <span class="highlight">${totalTime}</span> seconds
          </span>`

    clearInterval(loop);
    start.innerText = "Play Again";
  }, 1000)
  total = 0;
  game = false;
}
