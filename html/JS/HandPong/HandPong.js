// Canvas setup
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const roundsToWin = 7;
let mouseY = 0;

let player1 = {
    x : 0,
    y : canvasHeight / 2 - 100,
    width : 0.15 * canvasHeight,
    height: 0.15 * canvasHeight,
    wins : 0,
    name : "Player",
    integral: 0,
    prevError: 0,
    primary : true
}
let player2 = {
    x: 0,
    y: canvasHeight / 2 - 100,
    width: 0.15 * canvasHeight,
    height: 0.15 * canvasHeight,
    wins: 0,
    name: "Player",
    integral: 0,
    prevError: 0,
    primary: false
};

// Ball
let ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: canvasWidth / 100,
    dx: 2,
    dy: 2
};


// PID controller constants
let Kp = .02;
let Ki = 0.00;
let Kd = 0.05;


function reset(){
    player1.score = 0;
    player2.score = 0;

}

function updatePlayer(targetY, currentY, player) {
    let error = targetY - currentY;
    player.integral += error;
    let derivative = error - player.prevError;
    player.prevError = error;

    return Kp * error + Ki * player.integral + Kd * derivative;

}

// Mouse move event listener
canvas.addEventListener("mousemove", function(event) {
    let rect = canvas.getBoundingClientRect();
    let mousey = event.clientY - rect.top;
    player1.y = mousey - player1.height / 2;
    player2.y = mousey - player2.height / 2;
    mouseY = mousey;
})

// Game loop

player1.name = "Player 1";
player1.x = .0125 * canvasWidth;

player2.name = "Player 2";
player2.x = canvasWidth - player2.width - .0125 * canvasWidth;

function gameLoop() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    player1.y += updatePlayer(mouseY, player1.y,player1);
    player2.y += updatePlayer(mouseY, player2.y,player2);

    // Ensure paddle stays within canvas boundaries
    if (player1.y < 0) {
        player1.y = 0;
    } else if (player1.y + player1.height > canvasHeight) {
        player1.y = canvasHeight - player1.height
    }

    if (player2.y < 0) {
        player2.y = 0;
    } else if (player2.y + player2.height > canvasHeight) {
        player2.y = canvasHeight - player2.width;
    }

    // Collision detection with walls
    if (ball.y + ball.radius >= canvasHeight || ball.y - ball.radius <= 0) {
        ball.dy = -ball.dy;
    }

    // Collision detection with paddles
    if (ball.x - ball.radius <= player1.x + player1.width &&
        ball.y >= player1.y &&
        ball.y <= player1.y + player1.height) {
        ball.dx = -ball.dx;
    }
    if (ball.x + ball.radius >= player2.x &&
        ball.y >= player2.y &&
        ball.y <= player2.y + player2.width) {
        ball.dx = -ball.dx;
    }

    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Draw paddles
    ctx.fillStyle = "#FFF";
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

    // Draw ball
    ctx.beginPath();
    ctx.rect(ball.x, ball.y, ball.radius, ball.radius);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();

    // Draw the score
    ctx.font = "30px Arial";
    ctx.fillText(player1.wins, canvasWidth / 2 - 50, canvasHeight - 50);
    ctx.fillText(player2.wins, canvasWidth / 2 + 20, canvasHeight - 50);

    // Draw the center line
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.strokeStyle = "#FFF";
    ctx.stroke();
    ctx.closePath();

    // Draw the names
    ctx.font = "30px Arial";
    ctx.fillText(player1.name, 50, 50);
    ctx.fillText(player2.name, canvasWidth - 200, 50);

    //if the ball goes off the screen to the right, player 1 scores
    if (ball.x + ball.radius > canvasWidth) {
        ball.x = canvasWidth / 2;
        ball.y = canvasHeight / 2;
        ball.dx = -ball.dx;
        player1.wins++;
    }
    //if the ball goes off the screen to the left, player 2 scores
    if (ball.x - ball.radius < 0) {
        ball.x = canvasWidth / 2;
        ball.y = canvasHeight / 2;
        ball.dx = -ball.dx;
        player2.wins++
    }

    if (player1.wins === roundsToWin) {
            alert("Player 1 wins!");
            reset();
        }

    if
        (player2.wins === roundsToWin) {
            alert("Player 2 wins!");
            reset();
        }
}


    requestAnimationFrame(gameLoop);{

    gameLoop();
}