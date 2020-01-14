const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const player = {
  x: 0,
  y: canvasHeight / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: "white",
  score: 0
};

const enemy = {
  x: canvasWidth - 10,
  y: canvasHeight / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: "white",
  score: 0
};

const ball = {
  x: canvasWidth / 2,
  y: canvasHeight / 2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "white"
};

const net = {
  x: canvasWidth / 2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: "white"
};

let drawRect = (x, y, w, h, color) => {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
};

let drawCircle = (x, y, r, color) => {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
};

let drawText = (text, x, y, color) => {
  context.fillStyle = color;
  context.font = "45px fantasy";
  context.fillText(text, x, y);
};

let drawNet = () => {
  for (let i = 0; i <= canvasHeight; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
};

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

let movePaddle = evt => {
  let rect = canvas.getBoundingClientRect();

  player.y = evt.clientY - rect.top - player.height / 2;
};

canvas.addEventListener("mousemove", movePaddle);

let detectCollision = (b, p) => {
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

let resetBall = () => {
  ball.x = canvasWidth / 2;
  ball.y = canvasHeight / 2;

  ball.speed = 5;
  ball.velocityX = -ball.velocityX;
};

let decideWinner = () => {
  let winner;
  player.score === 3 ? (winner = "player") : (winner = "enemy");
  return winner;
};

let resetGameAfterWin = () => {
  if (player.score === 3 || enemy.score == 3) {
    player.score = 0;
    enemy.score = 0;
    render();
  }
};
let update = () => {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  computerLevel = 0.1;
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

let game = () => {
  update();
  render();
  decideWinner();
};

const framePerSecond = 60;
setInterval(game, 1000 / framePerSecond);
