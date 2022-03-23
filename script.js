const PREFIX = "RPS";

const main = document.querySelector("main");
const buttons = document.querySelectorAll("main > button");
const templates = document.querySelectorAll("template");
const playAgain = document.querySelector(".play-again");
const lineContainer = document.querySelector(".lines-container");
const scoreElem = document.querySelector("header .score > h1");
let score = 0;
let yourPick;

// Startup functions
//
// Get saved score if there is one
// Add the svg connecting lines

const localScore = localStorage.getItem(`${PREFIX}-SCORE`);
if (localScore) {
  score = localScore;
  scoreElem.textContent = score;
} else {
  scoreElem.textContent = 0;
}

addLines();

//
// Listen for User click
//

buttons.forEach((el) => {
  el.addEventListener("click", () => {
    yourPick = el.dataset.value;
    let housePick = document.querySelector(".house-pick");
    let rest = document.querySelectorAll(`main > button:not(.${el.classList[0]})`);
    let header = document.querySelectorAll(".pick-header");
    rest.forEach((elem) => {
      elem.classList.add("hide");
    });
    housePick.classList.remove("hide");
    lineContainer.classList.add("hide");
    header.forEach((el) => {
      el.classList.remove("hide");
    });
    el.classList.add("your-pick");
    main.classList.add("step");
    setTimeout(() => {
      pickRandom();
    }, 1000);
  });
});

playAgain.querySelector("button").addEventListener("click", restartGame);

//
// Open and close Rules Modal
//

const rulesBtn = document.querySelector(".rules");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal .close-btn");
rulesBtn.addEventListener("click", modalOpenClose);
modalCloseBtn.addEventListener("click", modalOpenClose);

function modalOpenClose() {
  modal.classList.toggle("hide");
}

//
// Helper Functions needed for game
//

// Generate computer pick randomly and check if user won or lost
function pickRandom() {
  if (!yourPick) return;
  const houseEmpty = document.querySelector(".house-pick");
  const pick = Math.floor(Math.random() * templates.length);
  const pickElem = templates[pick];
  var clone = pickElem.content.cloneNode(true);
  main.replaceChild(clone, houseEmpty);
  score = Number(score);

  switch (pick) {
    case 0:
      if (yourPick == 0) playAgainScreen("Tie");
      if (yourPick == 2) {
        playAgainScreen("You Win");
        win();
        score = score + 1;
      }
      if (yourPick == 1) {
        playAgainScreen("You Lose");
        lose();
        score = score - 1;
      }
      break;
    case 1:
      if (yourPick == 1) playAgainScreen("Tie");

      if (yourPick > 1) {
        playAgainScreen("You Lose");
        lose();
        score = score - 1;
      }
      if (yourPick < 1) {
        playAgainScreen("You Win");
        win();
        score = score + 1;
      }
      break;
    case 2:
      if (yourPick == 2) playAgainScreen("Tie");
      if (yourPick == 1) {
        playAgainScreen("You Win");
        win();
        score = score + 1;
      }
      if (yourPick == 0) {
        playAgainScreen("You Lose");
        lose();
        score = score - 1;
      }
      break;
  }

  if (score < 0) {
    score = 0;
  }
  localStorage.setItem(`${PREFIX}-SCORE`, score);
  scoreElem.textContent = score;
}

// Show the play again btn and show win or loss
function playAgainScreen(text) {
  main.classList.add("restart");
  playAgain.children[0].textContent = text;
  playAgain.classList.remove("hide");
}

function lose() {
  document.querySelector(".house-pick").classList.add("win-shadow");
}

function win() {
  document.querySelector(".your-pick").classList.add("win-shadow");
}

// Reset the screen to start over
function restartGame() {
  yourPick = "";
  let housePick = document.querySelector(".house-pick");
  let YourPick = document.querySelector(".your-pick");
  let rest = document.querySelectorAll(`main > button`);
  let header = document.querySelectorAll(".pick-header");
  rest.forEach((elem) => {
    if (elem.classList.contains("your-pick")) {
      elem.classList.remove("your-pick");
    }
    elem.classList.remove("hide");
  });
  housePick.innerHTML = "";
  housePick.classList.remove("win-shadow");
  YourPick.classList.remove("win-shadow");
  housePick.classList.add("empty");
  housePick.classList.add("hide");
  playAgain.classList.add("hide");
  lineContainer.classList.remove("hide");
  header.forEach((el) => {
    el.classList.add("hide");
  });
  main.classList.remove("step");
  main.classList.remove("restart");
}

// Open and close rules modal
function modalOpenClose() {
  modal.classList.toggle("hide");
}

// add the connecting lines dynamically rather than static with svg
function addLines() {
  var vw = main.clientWidth;
  var vh = main.clientHeight;

  lineContainer.innerHTML = "";

  buttons.forEach((el, index) => {
    let target;
    if (index === buttons.length - 1) {
      target = buttons[0];
    } else {
      target = buttons[index + 1];
    }

    let parentPos = main.getBoundingClientRect();
    let childPos = el.getBoundingClientRect();
    let relativePos = {};
    relativePos.top = childPos.top - parentPos.top;
    relativePos.right = childPos.right - parentPos.right;
    relativePos.bottom = childPos.bottom - parentPos.bottom;
    relativePos.left = childPos.left - parentPos.left;
    const box = relativePos;

    let childPosTarget = target.getBoundingClientRect();
    let relativePosTarget = {};
    relativePosTarget.top = childPosTarget.top - parentPos.top;
    relativePosTarget.right = childPosTarget.right - parentPos.right;
    relativePosTarget.bottom = childPosTarget.bottom - parentPos.bottom;
    relativePosTarget.left = childPosTarget.left - parentPos.left;
    const box2 = relativePosTarget;

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", `${((box.left + el.clientWidth / 2) / vw) * 100}%`);
    line.setAttribute("y1", `${((box.top + el.clientHeight / 2) / vh) * 100}%`);
    line.setAttribute("x2", `${((box2.left + target.clientWidth / 2) / vw) * 100}%`);
    line.setAttribute("y2", `${((box2.top + target.clientHeight / 2) / vh) * 100}%`);
    line.setAttribute("stroke", "black");
    svg.append(line);
    svg.classList.add(`line`);
    svg.classList.add(`${el.classList[0]}-to-${target.classList[0]}`);

    lineContainer.appendChild(svg);
  });
}
