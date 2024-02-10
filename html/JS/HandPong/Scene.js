const backgroundColor = '#000000';
const foregroundColor = '#FFFFFF';

import(Paddle.js);
import(Ball.js);
import(Score.js);
import(Names.js);



const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


let drawScene = function() {
    renderBackground();
    renderBall();
    renderPaddles();
    renderScore();
    renderNames();
    renderMiddleLine();
}

let renderBackground = function() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let renderMiddleLine = function() {
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = foregroundColor;
    ctx.stroke();
}

let getForegroundColor = function() {
    return foregroundColor;
}

let getBackgroundColor = function() {
    return backgroundColor;
}

