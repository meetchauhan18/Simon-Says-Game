let userSeq = [];
let gameSeq = [];
let gameStarted = false;
let level = 0;
let level_msg = document.querySelector("#level-msg");
let buttons = document.querySelectorAll(".btn");
let highestScore_span = document.querySelector("#highestScore");
let highestScore = localStorage.getItem("highestScore");
highestScore_span.innerText = highestScore;
console.log("Highest Score =",highestScore);

const btnFlash = () => {
  let colors = ["green", "red", "yellow", "blue"];
  let color = colors[Math.floor(Math.random() * colors.length)];
  let btn = document.querySelector(`#${color}`);
  btn.classList.add("gameflash");
  setTimeout(() => {
    btn.classList.remove("gameflash");
  }, 500);
  gameSeq.push(color);
  console.log(gameSeq);
};

const checkAnswer = (index) => {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(() => {
        btnFlash();
        userSeq = [];
        LevelUp();
        HighestScore(level);
      }, 1000);
    }
  } else {
    level_msg.innerText = `Game Over! Your Score is ${level} \n\nPress any key to start again.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "#00487C";
      }, 750);
    level = 0;
    gameStarted = false;
    userSeq = [];
    gameSeq = [];
  }
};

document.addEventListener("keypress", () => {
  if (gameStarted === false) {
    LevelUp();
    gameStarted = true;
    console.log("Is game started =", gameStarted);
    btnFlash();
  }
});

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (gameStarted === true) {
      let userColor = e.target.id;
      let btn = document.querySelector(`#${userColor}`);
      console.log(btn);
      btn.style.backgroundColor = "#09e53c";
      setTimeout(() => {
        btn.style.backgroundColor = `${userColor}`;
        }, 200);
      console.log(userColor);
      userSeq.push(userColor);
      console.log(userSeq);
      checkAnswer(userSeq.length - 1);
    }
  });
})

const LevelUp = () => {
  level++;
  level_msg.innerText = `Level ${level}`;
  console.log(level);
};

const HighestScore = (level) => {
    if (level > highestScore) {
        highestScore = level;
        console.log(highestScore);
        localStorage.setItem("highestScore", highestScore);
    }
};



