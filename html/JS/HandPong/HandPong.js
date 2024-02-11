// Canvas setup
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const roundsToWin = 7;

class player {
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }


    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get wins() {
        return this._wins;
    }

    set wins(value) {
        this._wins = value;
    }

    get primary() {
        return this._primary;
    }

    get relativeY() {
        return this._relativeY;
    }

    set relativeY(value) {
        this._relativeY = value;
    }
    constructor(name, x, y, width, height, wins, integral, prevError, primary, relativeY) {
        this.width = width;
        this.height = height;
        this.integral = integral;
        this.prevError = prevError;
        this._name = name;
        this.x = x;
        this._y = y;
        this._wins = wins;
        this._primary = primary;
        this._relativeY = relativeY;
    }

}


player1 = new player("Player 1", .0125 * canvasWidth, canvasHeight / 2 - 100, 0.015 * canvasHeight, 0.15 * canvasHeight, 0, 0, 0, true, 0);
player2 = new player("Player 2", canvasWidth - .0125 * canvasWidth, canvasHeight / 2 - 100, 0.015 * canvasHeight, 0.15 * canvasHeight, 0, 0, 0, false, 0);
// Ball
let ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: canvasWidth / 100,
    dx: 2 / canvasWidth,
    dy: 2 / canvasHeight

};

function reset(){
    player1.score = 0;
    player2.score = 0;

}



// PID controller constants
let Kp = .02;
let Ki = 0.00;
let Kd = 0.05;


// PID controller that outputs the relative Y position of the paddle with the location input between 0 and 1
function updatePlayer(location, y, player) {
    location *= canvasHeight;
    let error = location - y;
    player.integral += error;
    let derivative = error - player.prevError;
    player.prevError = error;
    return Kp * error + Ki * player.integral + Kd * derivative;
}


function gameLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Update the paddle positions
    player1.y += updatePlayer(player1.relativeY, player1.y, player1);
    player2.y += updatePlayer(player2.relativeY, player2.y, player2);

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
        player2.wins++;
    }

    if (player1.wins === roundsToWin) {
        alert("Player 1 wins!");
        reset();
    }

    if (player2.wins === roundsToWin) {
        alert("Player 2 wins!");
        reset();
    }

    // Call the gameLoop function again
    requestAnimationFrame(gameLoop);
}

// Call the gameLoop function to start the game
gameLoop();