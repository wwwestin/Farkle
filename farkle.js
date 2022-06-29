const rollBtn = document.getElementById('roll-btn');
const bankBtn = document.getElementById('bank-btn');
const diceImgs = document.querySelectorAll('.dice > img');
const score = document.getElementById('score');

window.addEventListener('load', () => {
  initializeDice();
});

// Generate original die order
function initializeDice() {
  for (var i = 0; i < 6; i++) {
    diceArr[i] = {};
    diceArr[i].id = 'die' + (i + 1);
    diceArr[i].value = i + 1;
    diceArr[i].clicked = 0;
  }
}

// Surprise! This is a key for score combinations
const scoreKey = {
  1: { 1: 100, 3: 1000 },
  2: { 3: 200 },
  3: { 3: 300 },
  4: { 3: 400 },
  5: { 1: 50, 3: 500 },
  6: { 3: 600 },
};

// Keeps track of die order after roll, the score round, and uses a hashmap to calcuatate score at the end of game
var diceArr = [];
var roundScore = [];
const roll = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
};

/*Rolling dice values*/
async function rollDice() {
  for (var i = 0; i < 6; i++) {
    if (diceArr[i].clicked === 0) {
      diceArr[i].value = Math.floor(Math.random() * 6 + 1);
    }
  }
  return diceArr;
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(diceArr) {
  for (var i = 0; i < 6; i++) {
    document
      .getElementById(diceArr[i].id)
      .setAttribute('src', `images/${diceArr[i].value}.png`);
  }
  return diceArr;
}

// Event listener for clicking die to hold for re-roll
function diceClick(img) {
  var i = img.getAttribute('data-number');
  img.classList.toggle('transparent');
  if (diceArr[i].clicked === 0) {
    diceArr[i].clicked = 1;
  } else {
    diceArr[i].clicked = 0;
  }
}

// Adds value to die that reoccurs
async function selectDie(diceArr) {
  let selectedDice = diceArr.filter((die) => die.clicked != 0);

  selectedDice.forEach((die) => {
    roll[die.value] += 1;
  });

  return roll;
}

// Calculates final score
function calcScore(roll) {
  Object.keys(roll).forEach((key) => {
    let val = roll[key];
    let keyVal = scoreKey[key];
    roundScore.push(keyVal[val]);
  });
  let final = roundScore.filter((num) => num);
  return final.reduce((a, b) => a + b);
}

// Event listener for unselecting die
diceImgs.forEach((dice) => {
  dice.addEventListener('click', () => {
    diceClick(dice);
  });
});

// Event listener for rolling die
rollBtn.addEventListener('click', () => {
  rollDice().then((diceArray) => updateDiceImg(diceArray));
});

// Event listener for banking score
bankBtn.addEventListener('click', () => {
  selectDie(diceArr)
    .then((roll) => calcScore(roll))
    .then((totalScore) => {
      score.innerText = totalScore;
    })
    .then();
});