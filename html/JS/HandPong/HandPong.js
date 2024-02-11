// Canvas setup
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const roundsToWin = 7;

let player = {
    x : 1,
    y : canvas.height / 2 - 100,
    width : 0.15 * canvas.height,
    height : canvas.height / 2 - paddleHeight / 2,
    wins : 0,
    name : "Player"
}

// Ball
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: canvas.width / 100,
    dx: 2,
    dy: 2
};

// Paddles


let score = {
    left: 0,
    right: 0
}

// PID controller constants
let Kp = .02;
let Ki = 0.00;
let Kd = 0.05;

let prevErrorRight = 0;
let integralRight = 0;
let prevErrorLeft = 0;
let integralLeft = 0;

function reset(){
    score.left = 0;
    score.right = 0;

}

function updatePlayer(targetY, currentY) {
    let error = targetY - currentY;
    integralRight += error;
    let derivative = error - prevErrorRight;
    prevErrorRight = error;

    return Kp * error + Ki * integralRight + Kd * derivative;

}

// Mouse move event listener
canvas.addEventListener("mousemove", function(event) {
    let rect = canvas.getBoundingClientRect();
    var mouseY = event.clientY - rect.top;
    player1.y = mouseY - paddleHeight / 2;
    player2.y = mouseY - paddleHeight / 2;
});

// Game loop

let player1 = new Player();
player1.name = "Player 1";
player1.x = .0125 * canvas.width;

let player2 = new Player();
player2.name = "Player 2";
player2.x = canvas.width - paddleWidth - .0125 * canvas.width;

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move paddles
    player1.y += updatePlayer(mouseY, player1.y);
    player2.y += updatePlayer(mouseY, player2.y);

    // Ensure paddle stays within canvas boundaries
    if (player1.y < 0) {
        player1.y = 0;
    } else if (player1.y + paddleHeight > canvasHeight) {
        player1.y = canvasHeight - paddleHeight;
    }

    if (player2.y < 0) {
        player2.y = 0;
    } else if (player2.y + paddleHeight > canvasHeight) {
        player2.y = canvasHeight - paddleHeight;
    }

    // Collision detection with walls
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.dy = -ball.dy;
    }

    // Collision detection with paddles
    if (ball.x - ball.radius <= player1.x + paddleWidth &&
        ball.y >= player1.y &&
        ball.y <= player1.y + paddleHeight) {
        ball.dx = -ball.dx;
    }
    if (ball.x + ball.radius >= player2.x &&
        ball.y >= player2.y &&
        ball.y <= player2.y + paddleHeight) {
        ball.dx = -ball.dx;
    }

    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Draw paddles
    ctx.fillStyle = "#FFF";
    ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);
    ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.rect(ball.x, ball.y, ball.radius, ball.radius);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();

    // Draw the score
    ctx.font = "30px Arial";
    ctx.fillText(score.left, canvas.width / 2 - 50, canvas.height - 50);
    ctx.fillText(score.right, canvas.width / 2 + 20, canvas.height - 50);

    // Draw the center line
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#FFF";
    ctx.stroke();
    ctx.closePath();

    // Draw the names
    ctx.font = "30px Arial";
    ctx.fillText(names.left, 50, 50);
    ctx.fillText(names.right, canvas.width - 200, 50);

    //if the ball goes off the screen to the right, player 1 scores
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
        score.left++;
    }
    //if the ball goes off the screen to the left, player 2 scores
    if (ball.x - ball.radius < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
        score.right++;
    }

    if (score.left === roundsToWin) {
            alert("Player 1 wins!");
            reset();
        }

    if
        (score.right === roundsToWin) {
            alert("Player 2 wins!");
            reset();
        }
}


    requestAnimationFrame(gameLoop);{

    gameLoop();
}