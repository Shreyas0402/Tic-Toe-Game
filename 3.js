let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newGamebtn = document.querySelector("#New-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const rules = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            box.style.pointerEvents = "none";
            checkWinner();
            if (!turnO) {
                setTimeout(computerPlay, 500); 
            }
        }
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled=true;
        
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;           
        box.style.pointerEvents = "auto"; 
        box.innerText = "";             
    }
};

const checkWinner = () => {
    for (let pattern of rules) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const computerPlay = () => {
    let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");

    // Check if computer can win
    for (let pattern of rules) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText === "X" && boxes[b].innerText === "X" && boxes[c].innerText === "") {
            boxes[c].innerText = "X";
            boxes[c].style.pointerEvents = "none";
            turnO = true;
            checkWinner();
            return;
        }
        if (boxes[a].innerText === "X" && boxes[b].innerText === "" && boxes[c].innerText === "X") {
            boxes[b].innerText = "X";
            boxes[b].style.pointerEvents = "none";
            turnO = true;
            checkWinner();
            return;
        }
        if (boxes[a].innerText === "" && boxes[b].innerText === "X" && boxes[c].innerText === "X") {
            boxes[a].innerText = "X";
            boxes[a].style.pointerEvents = "none";
            turnO = true;
            checkWinner();
            return;
        }
    }

    // Block player's winning move
    for (let pattern of rules) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText === "O" && boxes[b].innerText === "O" && boxes[c].innerText === "") {
            boxes[c].innerText = "X";
            boxes[c].style.pointerEvents = "none";
            turnO = true;
            checkWinner();
            return;
        }
        if (boxes[a].innerText === "O" && boxes[b].innerText === "" && boxes[c].innerText === "O") {
            boxes[b].innerText = "X";
            boxes[b].style.pointerEvents = "none";
            turnO = true;
            checkWinner();
            return;
        }
        if (boxes[a].innerText === "" && boxes[b].innerText === "O" && boxes[c].innerText === "O") {
            boxes[a].innerText = "X";
            boxes[a].style.pointerEvents = "none";
            turnO = true;
            checkWinner();
            return;
        }
    }

    // Make a random move
    if (availableBoxes.length > 0) {
        let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        randomBox.innerText = "X";
        randomBox.style.pointerEvents = "none";
        turnO = true;
        checkWinner();
    }
};

//  if(boxes === computerPlay){
//     resetbtn ;
// };

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
