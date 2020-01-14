import {
  canvas,
  context,
  canvasHeight,
  canvasWidth,
  framePerSecond
} from "./config.js";
import { drawRect, drawNet, drawCircle, drawText } from "./drawFunctions.js";
import { player, enemy, net, ball } from "./objects.js";
import {
  detectCollision,
  decideWinner,
  resetBall,
  movePaddle
} from "./gameLogic.js";

let render = () => {
  drawRect(0, 0, canvasWidth, canvasHeight, "black");
  drawText(player.score, canvasWidth / 4, canvasHeight / 5, "white");
  drawText(enemy.score, (3 * canvasWidth) / 4, canvasHeight / 5, "white");
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(enemy.x, enemy.y, enemy.width, enemy.height, enemy.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
  drawNet();
  resetGameAfterWin();
};

let update = () => {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  let computerLevel = 0.1;
  enemy.y += (ball.y - (enemy.y + enemy.height / 2)) * computerLevel;

  if (ball.y + ball.radius > canvasHeight || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }
  let currentPlayer = ball.x < canvasWidth / 2 ? player : enemy;
  if (detectCollision(ball, currentPlayer)) {
    let collidePoint = ball.y - (currentPlayer.y + currentPlayer.height);
    collidePoint = collidePoint / (currentPlayer.height / 2);

    let angle = (collidePoint * Math.PI) / 4;
    let direction = ball.x < canvasWidth / 2 ? 1 : -1;

    ball.velocityX = direction * ball.speed * Math.cos(angle);
    ball.velocityY = direction * ball.speed * Math.sin(angle);

    ball.speed += 0.1;
  }

  if (ball.x - ball.radius < 0) {
    enemy.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvasWidth) {
    player.score++;
    resetBall();
  }
};

let resetGameAfterWin = () => {
  if (player.score === 3 || enemy.score == 3) {
    player.score = 0;
    enemy.score = 0;
    render();
  }
};

let game = () => {
  update();
  render();
  decideWinner();
};

setInterval(game, 1000 / framePerSecond);
