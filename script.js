//
// Rules Modal
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
// Lines in between the Rock, Paper and Scissors buttons.
//

function addLines() {
  const main = document.querySelector("main");
  var vw = main.clientWidth;
  var vh = main.clientHeight;
  const divs = document.querySelectorAll("main > button");
  const lineContainer = document.querySelector(".lines-container");

  lineContainer.innerHTML = "";

  divs.forEach((el, index) => {
    let target;
    if (index === divs.length - 1) {
      target = divs[0];
    } else {
      target = divs[index + 1];
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

addLines();
