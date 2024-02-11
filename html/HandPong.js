// Canvas setup
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const roundsToWin = 100;

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
        this.integral = 0;
        this.prevError = 0;
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


let ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: canvasWidth / 100,
    dx: 1/800 * canvasWidth,
    dy: 1/600 * canvasHeight

};

function reset(){
    player1.wins = 0;
    player2.wins = 0;
    player1.y = canvasHeight / 2 - 100;
    player2.y = canvasHeight / 2 - 100;

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

function drawScore()  {
    ctx.font = "50px Arial";
    ctx.fillText(player1.wins, canvasWidth / 4, 50);
    ctx.fillText(player2.wins, canvasWidth * 3 / 4, 50);
}

function drawNames() {
    ctx.font = "30px Arial";
    ctx.fillText(player1.name, 50, 50);
    ctx.fillText(player2.name, canvasWidth - 200, 50);

}

function drawCenterLine() {
    ctx.beginPath();
    ctx.setLineDash([canvasHeight / 20]);
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.strokeStyle = "#FFF";
    ctx.stroke();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.rect(ball.x, ball.y, ball.radius, ball.radius);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function drawPlayers() {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function testGoal() {
    //if the ball goes off the screen to the right, player 1 scores
    if (ball.x + ball.radius > canvasWidth) {
        respawnBall();
        player1.wins++;
    }
    //if the ball goes off the screen to the left, player 2 scores
    if (ball.x - ball.radius < 0) {
        respawnBall();
        player2.wins++;
    }
}

function testWin() {
    if (player1.wins === roundsToWin) {
        alert("Player 1 wins!");
        reset();
    }

    if (player2.wins === roundsToWin) {
        alert("Player 2 wins!");
        reset();
    }
}

function respawnBall() {
    //spawns ball at random y position with random x direction and random y direction at an angle between 30 and 150 degrees while maintaining a minimum speed of 1
    ball.x = canvasWidth / 2;
    ball.y = Math.random() * canvasHeight;
    ball.dx = Math.random() /800 * canvasWidth /800 * canvasWidth;
    ball.dy = Math.random() /600 * canvasHeight /600 * canvasHeight;
    if (Math.random() > 0.5) {
        ball.dx = -ball.dx;
    }
    if (Math.random() > 0.5) {
        ball.dy = -ball.dy;
    }
}

function testPlayerCollide() {
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
}

function testWallCollide() {
    if (ball.y + ball.radius >= canvasHeight || ball.y - ball.radius <= 0) {
        ball.dy = -ball.dy;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function movePlayers() {
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
}

function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    //readData();

    moveBall();
    movePlayers();
    testWallCollide();
    testPlayerCollide();

    //sendBallData();
    //sendPlayerData();


    // Draw the game objects
    drawPlayers();
    drawBall();
    drawScore();
    drawNames();
    drawCenterLine();
    testGoal();
    testWin();


    // Call the gameLoop function again
    requestAnimationFrame(gameLoop);
}

// Call the gameLoop function to start the game
gameLoop();