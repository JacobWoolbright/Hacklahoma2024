var playerOneScore = 0;
var playerTwoScore = 0;
var winGoal = 10;
const defaultWinGoal = 10;

playerOneGoal = function() { //Player One scores a goal
    playerOneScore++;
}

playerTwoGoal = function() { //Player Two scores a goal
    playerTwoScore++;
}

scoreReset = function() { //Resets the score
    playerOneScore = 0;
    playerTwoScore = 0;
}

renderScore = function() { //Renders the score
    ctx.fillStyle = foregroundColor;
    ctx.font = '48px Arial';
    ctx.fillText(playerOneScore, canvas.width / 4, 50);
    ctx.fillText(playerTwoScore, canvas.width * 3 / 4, 50);
}

winCheck = function() { //Checks if a player has won
    if (playerOneScore >= winGoal) {
        alert('Player One Wins!');
        scoreReset();
    } else if (playerTwoScore >= winGoal) {
        alert('Player Two Wins!');
        scoreReset();
    }
}

winSet = function(score) { //Sets the win goal
    wingoal = score
}

winReset = function() { //Resets the win goal
    winGoal = defaultWinGoal;
}