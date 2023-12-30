let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highestLevel = localStorage.getItem("highestLevel");

let h2 = document.querySelector("h2");  

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("game started");
        started = true;

        levelup();
    }
});

function gameflash (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash (btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup () {
    userSeq = [];
    level++;
    
    if(level > highestLevel){
        highestLevel = level;
        localStorage.setItem("higestLevel", highestLevel);
    }
    h2.innerText = `Level ${level}`;
 
    let randIdx = Math.floor(Math.random() * 3);
    let randColor =  btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`); 
    gameSeq.push(randColor);  
    gameflash(randBtn);
}

function checkAns (idx) {
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup, 1000);
        } 
    }
    else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start. Highest score of player is ${highestLevel}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        })
        reset();
    }
 }

// function checkAns() {
//     for (let idx = 0; idx < userSeq.length; idx++) {
//         if (userSeq[idx] !== gameSeq[idx]) {
//             h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
//             reset();
//             return;
//         }
//     }

//     console.log("Same value");
//     if (userSeq.length == gameSeq.length) {
//         setTimeout(levelup, 1000);
//     }
// }


function btnPress() {
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn){
    btn.addEventListener("click", btnPress);
}

function reset () {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}