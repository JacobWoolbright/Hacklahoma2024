var playerOneName = "Player One";
var playerTwoName = "Player Two";

nameSet = function() { //Sets the player names
    playerOneName = document.getElementById('playerOneName').value;
    playerTwoName = document.getElementById('playerTwoName').value;
}

nameReset = function() { //Resets the player names
    playerOneName = "Player One";
    playerTwoName = "Player Two";
}

renderNames = function() { //Renders the player names
    ctx.fillStyle = foregroundColor;
    ctx.font = '48px Arial';
    ctx.fillText(playerOneName, canvas.width / 4, 50);
    ctx.fillText(playerTwoName, canvas.width * 3 / 4, 50);
}

