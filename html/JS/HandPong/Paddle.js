const paddleLength = 100; // height
const paddleWidth = 20; // width
const paddleOffset = 10; // distance from edge


var paddlePos = 10; // distance from top
let playerOne = false; // true if player one, false if player two

const paddleLeft = paddleWidth + paddleOffset; // left paddle offset
const paddleRight = canvas.width - paddleWidth - paddleOffset; // right paddle offset

const paddleColor = getForegroundColor(); // paddle color

let posY = 0; // height from top

paddle = new Path2D(); // paddle path
if (playerOne) {
    paddle.rect(paddleLeft, paddlePos, paddleWidth, paddleLength);
}
else {
    paddle.rect(paddleRight, paddlePos, paddleWidth, paddleLength);
}

paddleMove = function() { // moves the paddle

    paddlePos = posY - paddleLength / 2;

    if (paddlePos < 0) {
        paddlePos = 0;
    }
    if (paddlePos > canvas.height - paddleLength) {
        paddlePos = canvas.height - paddleLength;
    }
}

renderPaddle = function() {
    ctx.fillStyle = paddleColor;
    ctx.fill(paddle);
}


