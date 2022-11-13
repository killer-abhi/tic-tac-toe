let Player1Mark = "O";
let CurrentMark;
const childCell = document.getElementsByClassName("cell-child");

// let Filledcells = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let Filledcells = new Array(9);
Filledcells.fill(-1);
let imgO = document.createElement("img");
let imgX = document.createElement("img");

imgO.src = "./assets/images/icon-o.svg";
imgX.src = "./assets/images/icon-x.svg";

let hoverO = document.createElement("img");
let hoverX = document.createElement("img");

hoverO.src = "./assets/images/icon-o-outline.svg";
hoverX.src = "./assets/images/icon-x-outline.svg";

function handlePlayerMark(selected) {
  if (selected === 0) {
    Player1Mark = "O";
  } else {
    Player1Mark = "X";
  }
  let previousSelected;
  if (selected === 0) {
    previousSelected = document.getElementsByClassName("mark")[1];
  } else {
    previousSelected = document.getElementsByClassName("mark")[0];
  }
  previousSelected.classList.remove("mark-active");
  let selectedMark = document.getElementsByClassName("mark")[selected];
  selectedMark.classList.add("mark-active");
}
function handleGame(type) {
  CurrentMark = Player1Mark;
  document.getElementById("img-Mark").innerHTML = imgO;
  document.getElementsByClassName("start-game")[0].style.display = "none";
  document.getElementsByClassName("game")[0].style.display = "flex";
}

function changePlayer() {
  //   console.log(childCell);
  console.log(CurrentMark);
  if (CurrentMark == "O") {
    // document.getElementById("img-Mark").classList.remove("turn-O");
    childCell[0].classList.toggle("y");
    CurrentMark = "X";
    // document.getElementById("img-Mark").classList.add("turn-X");
  } else {
    // document.getElementById("img-Mark").classList.remove("turn-X");
    CurrentMark = "O";
    // document.getElementById("img-Mark").classList.add("turn-O");
    childCell[0].classList.toggle("y");
  }
}
function handleClick(index) {
  if (CurrentMark === "O") {
    Filledcells[index] = 0;
    document.getElementsByClassName("cell")[index].appendChild(imgO);
  } else {
    Filledcells[index] = 1;
    document.getElementsByClassName("cell")[index].appendChild(imgX);
  }
  changePlayer();
}
function checkHover(index) {
  for (var i = 0; i < Filledcells.length; i++) {
    if (Filledcells[index] === -1) {
      return 1;
    } else {
      return 0;
    }
  }
}

function handleHover(index) {
  if (checkHover(index)) {
    let hoveredCell = document.getElementsByClassName("cell")[index];
    hoveredCell.style.cursor = "pointer";
    if (CurrentMark === "O") {
      console.log(document.getElementsByClassName("x")[0]);
    } else {
      hoveredCell.appendChild(hoverX);
    }
    hoveredCell.addEventListener("click", function () {
      handleClick(index);
      console.log("clicked");
    });
  }
}