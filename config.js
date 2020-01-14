const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const framePerSecond = 60;

export { canvas, context, canvasWidth, canvasHeight, framePerSecond };
