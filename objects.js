import {
  canvas,
  context,
  canvasHeight,
  canvasWidth,
  framePerSecond
} from "./config.js";

export const player = {
  x: 0,
  y: canvasHeight / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: "white",
  score: 0
};

export const enemy = {
  x: canvasWidth - 10,
  y: canvasHeight / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: "white",
  score: 0
};

export const ball = {
  x: canvasWidth / 2,
  y: canvasHeight / 2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "white"
};

export const net = {
  x: canvasWidth / 2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: "white"
};
