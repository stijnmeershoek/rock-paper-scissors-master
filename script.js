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
    const box = el.getBoundingClientRect();
    const box2 = target.getBoundingClientRect();

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", box.left + el.clientWidth / 2);
    line.setAttribute("y1", box.top + el.clientHeight / 2);
    line.setAttribute("x2", box2.left + el.clientWidth / 2);
    line.setAttribute("y2", box2.top + el.clientHeight / 2);
    line.setAttribute("stroke", "black");
    svg.append(line);
    svg.classList.add(`line`);
    svg.classList.add(`${el.classList[0]}-to-${target.classList[0]}`);

    lineContainer.appendChild(svg);
  });
}

addLines();
