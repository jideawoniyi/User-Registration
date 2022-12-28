const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");

let paddle1Y = 150;
let paddle2Y = 150;
let ballX = 295;
let ballY = 195;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1ScoreCount = 0;
let player2ScoreCount = 0;

document.addEventListener("keydown", movePaddle);

function movePaddle(event) {
  if (event.keyCode == 87) {
    paddle1Y -= 20;
    if (paddle1Y < 0) {
      paddle1Y = 0;
    }
    paddle1.style.top = `${paddle1Y}px`;
  } else if (event.keyCode == 83) {
    paddle1Y += 20;
    if (paddle1Y > 300) {
      paddle1Y = 300;
    }
    paddle1.style.top = `${paddle1Y}px`;
  }
  if (event.keyCode == 38) {
    paddle2Y -= 20;
    if (paddle2Y < 0) {
      paddle2Y = 0;
    }
    paddle2.style.top = `${paddle2Y}px`;
  } else if (event.keyCode == 40) {
    paddle2Y += 20;
    if (paddle2Y > 300) {
      paddle2Y = 300;
    }
    paddle2.style.top = `${paddle2Y}px`;
  }
}

function game() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX > 580 || ballX < 20) {
    if (ballX > 580) {
      player1ScoreCount++;
      player1Score.textContent = player1ScoreCount;
    } else {
      player2ScoreCount++;
      player2Score.textContent = player2ScoreCount;
    }
    ballX = 295;
    ballY = 195;
    ballSpeedX = -ballSpeedX;
  }
  if (ballY > 380 || ballY < 20) {
    ballSpeedY = -ballSpeedY;
  }
  if (
    ballX > 565 &&
    ballX < 585 &&
    ballY > paddle2Y - 20 &&
    ballY < paddle2Y + 120
  ) {
    ballSpeedX = -ballSpeedX;
  }
  if (
    ballX > 15 &&
    ballX < 35 &&
    ballY > paddle1Y - 20 &&
    ballY < paddle1Y + 120
  ) {
    ballSpeedX = -ballSpeedX;
  }
  ball.style.top = `${ballY}px`;
  ball.style.left = `${ballX}px`;
  requestAnimationFrame(game);
}

game();
