let Player1Mark = "O";
let Player2Mark = "X";
let CurrentMark = Player1Mark;

let isCPU = 0;

var clicks = 0;
var scoreO = 0;
var scoreX = 0;
var ties = 0;

const childCells = document.getElementsByClassName("cell-child");

let CellsArray = new Array(9);
CellsArray.fill(-1);

let xCells = [];
let oCells = [];

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
        Player2Mark = "X";
    } else {
        Player1Mark = "X";
        Player2Mark = "O";
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

    if (type === 0) {
        if (Player1Mark === "O") {
            document.getElementById("PlayerOName").innerHTML = "O ( YOU )"
            document.getElementById("PlayerXName").innerHTML = "X ( CPU )"
        }
        else {
            document.getElementById("PlayerOName").innerHTML = "O ( CPU )"
            document.getElementById("PlayerXName").innerHTML = "X ( YOU )"
        }
        isCPU = 1;
    }
    if (type === 1) {
        if (Player1Mark === "O") {
            document.getElementById("PlayerOName").innerHTML = "O - Player 1"
            document.getElementById("PlayerXName").innerHTML = "X - Player 2"
        }
        else {
            document.getElementById("PlayerOName").innerHTML = "O - Player 2"
            document.getElementById("PlayerXName").innerHTML = "X - Player 1"
        }
    }

    document.getElementById("img-Mark").classList.toggle("turn-" + CurrentMark);

    document.getElementsByClassName("start-game")[0].style.display = "none";
    document.getElementsByClassName("game")[0].style.display = "flex";

    addHoverEffect();

}

function handleRestart(isWinOverlay) {
    CellsArray.fill(-1);
    xCells = [];
    oCells = [];
    clicks = 0;
    changePlayer();
    addHoverEffect();
    for (var i = 0; i < 9; i++) {
        document.getElementsByClassName("cell-child")[i].classList.remove("clicked-O");
        document.getElementsByClassName("cell-child")[i].classList.remove("clicked-X");
    }
    if (isWinOverlay) {
        document.getElementsByClassName("overlay")[0].style.display = "none";
    }
}

function addHoverEffect() {

    for (var i = 0; i < 9; i++) {
        if (CellsArray[i] === -1) {
            if (CurrentMark == "O") {
                childCells[i].classList.remove("hover-X");
            } else {
                childCells[i].classList.remove("hover-O");
            }
            childCells[i].classList.add("hover-" + CurrentMark);
        }
    }
}
function removeHoverEffect(index) {
    childCells[index].classList.remove("hover-X");
    childCells[index].classList.remove("hover-O");
}

function CPU() {

    let emptyCells = [];
    let k = 0;
    for (var i = 0; i < CellsArray.length; i++) {
        if (CellsArray[i] === -1) {
            emptyCells[k] = i;
            k++;
        }
    }
    // console.log(emptyCells);
    let random = Math.floor(Math.random() * (emptyCells.length));
    // console.log(random);
    var randomIndex = emptyCells[random];
    // console.log(randomIndex);
    var delayInMilliseconds = 200;

    setTimeout(function () {
        handleClick(randomIndex);
    }, delayInMilliseconds);
}

function changePlayer() {
    document.getElementById("img-Mark").classList.remove("turn-" + CurrentMark);
    if (CurrentMark == "O") {
        CurrentMark = "X";
    } else {
        CurrentMark = "O";
    }
    document.getElementById("img-Mark").classList.add("turn-" + CurrentMark);
    addHoverEffect();

    if (isCPU) {
        if (CurrentMark === Player2Mark) {
            CPU();
        }
    }
}


function AlreadyFilled(index) {
    if (CellsArray[index] !== -1) {
        return (1);
    }
    else {
        return (0);
    }
}

function handleClick(index) {
    // console.log(CurrentMark);
    if (!AlreadyFilled(index)) {
        removeHoverEffect(index);
        if (CurrentMark === "O") {
            oCells.push(index);
            CellsArray[index] = 0;
            // document.getElementsByClassName("cell-child")[index].classList.remove("x");
            document.getElementsByClassName("cell-child")[index].classList.toggle("clicked-O");
        } else {
            xCells.push(index);
            CellsArray[index] = 1;
            // document.getElementsByClassName("cell-child")[index].classList.remove("o");
            document.getElementsByClassName("cell-child")[index].classList.toggle("clicked-X");
        }
        clicks++;
        checkRoundResult();
    }
}

function checkRoundResult() {

    let isAnyWon=false;
    let winArrays = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    xCells = xCells.sort();
    oCells = oCells.sort();
    for (var i = 0; i < 8; i++) {

        var count1 = 0, count2 = 0;
        for (var j = 0; j < 3; j++) {

            for (var k = 0; k < xCells.length; k++) {
                if (winArrays[i][j] === xCells[k]) {
                    count1++;
                }

            }
            for (var k = 0; k < oCells.length; k++) {
                if (winArrays[i][j] === oCells[k]) {
                    count2++;
                }

            }
        }
        if (count1 === 3) {
            scoreX++;
            document.getElementById("scoreX").innerHTML = scoreX;
            winnerOverLay("X");
            isAnyWon=true;
        }
        else if (count2 === 3) {
            scoreO++;
            document.getElementById("scoreO").innerHTML = scoreO;
            winnerOverLay("O");
            isAnyWon=true;
        }
        else{
            isAnyWon=false;
        }
    }
    if (clicks === 9 && !isAnyWon) {
        var delayInMilliseconds=200;
        setTimeout(function () {
            handleTie();
        }, delayInMilliseconds);
    }
    changePlayer();
}

function handleTie() {
    console.log("9");
    ties++;
    document.getElementById("tie-count").innerHTML = ties;
    document.getElementsByClassName("overlay")[0].style.display = "flex";
    document.getElementsByClassName("tie-banner")[0].style.display = "flex";
    document.getElementsByClassName("win-card")[0].style.display = "none";
}

function winnerOverLay(playerWon) {
    document.getElementsByClassName("overlay")[0].style.display = "flex";
    document.getElementsByClassName("win-card")[0].style.display = "flex";
    document.getElementsByClassName("tie-banner")[0].style.display = "none";

    if (playerWon == Player1Mark) {
        document.getElementById("player-won").innerHTML = "Player 1 Wins !";
    } else {
        if (isCPU) {
            document.getElementById("player-won").innerHTML = " CPU Wins !";
        } else {
            document.getElementById("player-won").innerHTML = "Player 2Wins !";

        }
    }

    document.getElementById("win-mark").classList.remove("clicked-O");
    document.getElementById("win-mark").classList.remove("clicked-X");
    document.getElementById("win-mark").classList.add("clicked-" + playerWon);
}