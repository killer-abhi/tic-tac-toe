let Player1Mark = "O";
let CurrentMark=Player1Mark;

const childCells = document.getElementsByClassName("cell-child");

let CellsArray = new Array(9);
CellsArray.fill(-1);

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
    document.getElementById("img-Mark").classList.toggle("turn-"+CurrentMark);

    document.getElementsByClassName("start-game")[0].style.display = "none";
    document.getElementsByClassName("game")[0].style.display = "flex";
    
    addHoverEffect();
}

function addHoverEffect(){
    
    for(var i=0;i<9;i++){
        if(CellsArray[i]===-1){
            if (CurrentMark == "O") {
                childCells[i].classList.remove("hover-X");
            } else {
                childCells[i].classList.remove("hover-O");
            }
            childCells[i].classList.add("hover-"+CurrentMark);
        }
    }
}
function removeHoverEffect(index) {
    childCells[index].classList.remove("hover-X");
    childCells[index].classList.remove("hover-O");
}

function changePlayer() {
    document.getElementById("img-Mark").classList.remove("turn-"+CurrentMark);
    if (CurrentMark == "O") {
        CurrentMark = "X";
    } else {
        CurrentMark = "O";
    }
    document.getElementById("img-Mark").classList.add("turn-"+CurrentMark);
    addHoverEffect();
}


function AlreadyFilled(index){
    if(CellsArray[index]!==-1){
        return(1);
    }
    else{
        return(0);
    }
}

function handleClick(index) {
    console.log(CurrentMark);
    if (!AlreadyFilled(index)) {
        removeHoverEffect(index);
        if (CurrentMark === "O") {
            CellsArray[index] = 0;
            // document.getElementsByClassName("cell-child")[index].classList.remove("x");
            document.getElementsByClassName("cell-child")[index].classList.toggle("clicked-O");
        } else {
            CellsArray[index] = 1;
            // document.getElementsByClassName("cell-child")[index].classList.remove("o");
            document.getElementsByClassName("cell-child")[index].classList.toggle("clicked-X");
        }
        // checkRoundResult();
        changePlayer();
    }
}

function checkRoundResult(){
    const arr=[3][3];
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            arr[i][j]=CellsArray[i+j];
        }
    }
}
