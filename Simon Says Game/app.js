let gameSeq = [];
let userSeq = [];

let btns = ["blue", "purple", "yellow", "green"];

let started = false;
let level = 0;

// Started game
document.addEventListener('keypress', function () {
    if (started == false) {
        started = true;
    }

    levelUP();  // level up function call
})

let h2 = document.querySelector('h2');

// level up
function levelUP() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random box glow
    let randIdx = Math.floor(Math.random() * 4);
    // console.log(randIdx)
    let randColor = btns[randIdx];
    // console.log(randColor);
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randBtn);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
};

//  btn flash
function gameFlash(btn) {
    btn.classList.add("flash"); // Add glow class
    setTimeout(function () {
        btn.classList.remove("flash"); // Remove glow class after 1 sec
    }, 250);
};

//  user flash 
function userFlash(btn) {
    btn.classList.add("userflash"); // Add glow class
    setTimeout(function () {
        btn.classList.remove("userflash"); // Remove glow class after 1 sec
    }, 250);
};

// check btn

function check(idx) {
    // console.log(`level is: ${level}`);

    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
           setTimeout(levelUP,1000);
        }
        console.log("same value");
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press Any Key to start!`;
        document.querySelector("body").style.background = "red";
        setTimeout(function () {
            document.querySelector("body").style.background = "white";
        }, 150);
        reset();
    }
}

// reset function 
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// btn press 
function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    console.log(userSeq);

    check(userSeq.length-1);

    
}
let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns) {
    btn.addEventListener('click', btnPress);
}