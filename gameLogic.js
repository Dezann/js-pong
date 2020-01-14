import { player, enemy, net, ball } from "./objects.js";
import {
  canvas,
  context,
  canvasHeight,
  canvasWidth,
  framePerSecond
} from "./config.js";

export let detectCollision = (b, p) => {
  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  return (
    b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
  );
};

export let resetBall = () => {
  ball.x = canvasWidth / 2;
  ball.y = canvasHeight / 2;

  ball.speed = 5;
  ball.velocityX = -ball.velocityX;
};

export let decideWinner = () => {
  let winner;
  player.score === 3 ? (winner = "player") : (winner = "enemy");
  return winner;
};

export let movePaddle = evt => {
  let rect = canvas.getBoundingClientRect();

  player.y = evt.clientY - rect.top - player.height / 2;
};

canvas.addEventListener("mousemove", movePaddle);

let resetGameAfterWin = () => {
  if (player.score === 3 || enemy.score == 3) {
    player.score = 0;
    enemy.score = 0;
    render();
  }
};
