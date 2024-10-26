const container = document.getElementById('main');
var cardslength = 0;
let cards = [];
var total = 0;
var game = true;

const controls = document.querySelector('.controls');
const moves = document.querySelector('.moves');
const timer = document.querySelector('.timer');
const start = document.querySelector('button');
const win = document.querySelector('.win');
const instructions = document.querySelector('.instructions');
const levelContainer = document.querySelector('.level-container');

moves.innerText="";
timer.innerText="";
const print = instructions.innerHTML;
const lev=levelContainer.innerHTML;

let totalTime = 0;
let totalFlips = 0;
let loop = null;
let select =null;

levelContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('level')) {
      const clicked =event.target;
      cardslength = Number(event.target.dataset.level);
    
      if(select)
      {
        select.style.backgroundColor='white';
        select.style.color='blue';
      }
      clicked.style.backgroundColor='red';
      clicked.style.color='white';
      select=clicked;



  }
});

start.addEventListener('click', () => {
  if(cardslength==0)
  {
    alert("You must select level");
    return;
  }
  totalTime = 0;
  totalFlips = 0;
  
  container.innerHTML = "";
  board();
  moves.innerText = "0 moves";
  timer.innerText = "time: 0 sec";
  if (!loop) {
    instructions.innerHTML = "";
    levelContainer.innerHTML="";
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
    
    loop = null;
    start.textContent = "Start";
    game = true;
    instructions.innerHTML = print;
    levelContainer.innerHTML=lev;
    total=0;
    moves.innerText="";
    timer.innerText="";
    cardslength=0;
  }

});


let previousShownCard = undefined;

const board = () => {
  if (game) {
  let icons = [
    'Assets/C++.png',
    'Assets/python.png',
    'Assets/javascript.png',
    'Assets/java.png',
    'Assets/R.png',
    'Assets/C.png',
    'Assets/PHP.png',
    'Assets/Chash.png',
    'Assets/Typescript.png',
    'Assets/Ruby.png',
    'Assets/HTML.png',
    'Assets/CSS.png'
  ];
 function Shuffle(arr){
  for (let i = 0; i < 30; i++) {

    const idx1 = Math.floor(Math.random() * arr.length);
    const idx2 = Math.floor(Math.random() * arr.length);

    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }
  return arr;
 }
  icons=Shuffle(icons);
  // Copy the icons again so we can use them in the cards
  let cards=icons.slice(0,cardslength/2);
  // Shuffle the icons
  cards.push(...cards)
  cards=Shuffle(cards);
  const wt = cardslength === 20 ? '20%' : '25%';
  const ht =cardslength === 20 ? '25%' : '28%';
  
    for (let i = 0; i < cardslength; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `<div class="front">
                      <img src="${cards[i]}"/>
                    </div>
                    <div class="back">
                      <small>Click me</small>
                    </div>`;

      card.style.width = `calc(${wt} - 10px)`;
      card.style.height = `calc(${ht} - 10px)`;
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
        if (2*total == cardslength)
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
