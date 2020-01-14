import { player, enemy, net, ball } from "./objects.js";
import {
  canvas,
  context,
  canvasHeight,
  canvasWidth,
  framePerSecond
} from "./config.js";

export let drawRect = (x, y, w, h, color) => {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
};

export let drawCircle = (x, y, r, color) => {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
};

export let drawText = (text, x, y, color) => {
  context.fillStyle = color;
  context.font = "45px fantasy";
  context.fillText(text, x, y);
};

export let drawNet = () => {
  for (let i = 0; i <= canvasHeight; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
};
